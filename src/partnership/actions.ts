"use server";

import { revalidatePath } from "next/cache";
import { partnershipDb } from "./db";

type Result = { ok: true } | { ok: false; error: string };

function text(form: FormData, key: string) {
  const value = form.get(key);
  return typeof value === "string" ? value.trim() : "";
}

async function audit(area: string, action: string, actorId: string, detail: string) {
  const { db } = await partnershipDb();
  if (!db) return;
  await db.from("partnership_audit").insert({ area, action, actor_id: actorId, detail });
}

function done(path: string): Result {
  revalidatePath(path);
  revalidatePath("/admin/partnership");
  return { ok: true };
}

export async function savePartner(form: FormData): Promise<Result> {
  const gate = await partnershipDb(text(form, "kind") === "economic");
  if (!gate.db || !gate.profile) return { ok: false, error: gate.error ?? "Sem acesso." };
  const name = text(form, "name");
  const kind = text(form, "kind");
  if (!name || !kind) return { ok: false, error: "Nome e tipo são obrigatórios." };
  const code = text(form, "code") || `${kind.slice(0, 3)}-${crypto.randomUUID().slice(0, 8)}`;
  const percent = text(form, "approved_percent");
  const { error } = await gate.db.from("partnership_partners").insert({
    kind,
    name,
    email: text(form, "email") || null,
    country: text(form, "country") || null,
    language: text(form, "language") || null,
    code,
    products: text(form, "products")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean),
    status: "pending",
    contract_instrument: text(form, "contract_instrument") || null,
    economic_rights: text(form, "economic_rights") || null,
    approved_percent: percent ? Number(percent) : null,
    remuneration: text(form, "remuneration") || null,
    documentation: text(form, "documentation") || null,
  });
  if (error) return { ok: false, error: error.message };
  await audit("partners", "create", gate.profile.id, `${kind}:${name}`);
  return done("/admin/partnership/parceiros");
}

export async function setPartnerStatus(form: FormData): Promise<Result> {
  const gate = await partnershipDb();
  if (!gate.db || !gate.profile) return { ok: false, error: gate.error ?? "Sem acesso." };
  const id = text(form, "id");
  const status = text(form, "status");
  if (!id || !status) return { ok: false, error: "Registro inválido." };
  const { error } = await gate.db
    .from("partnership_partners")
    .update({ status, updated_at: new Date().toISOString() })
    .eq("id", id);
  if (error) return { ok: false, error: error.message };
  await gate.db.from("partnership_partner_events").insert({
    partner_id: id,
    action: status,
    note: text(form, "note") || null,
    actor_id: gate.profile.id,
  });
  await audit("partners", status, gate.profile.id, id);
  return done("/admin/partnership/parceiros");
}

export async function saveChannel(form: FormData): Promise<Result> {
  const gate = await partnershipDb();
  if (!gate.db || !gate.profile) return { ok: false, error: gate.error ?? "Sem acesso." };
  const name = text(form, "name");
  if (!name) return { ok: false, error: "Informe o nome do canal." };
  const participants = text(form, "participants");
  const { error } = await gate.db.from("partnership_whatsapp_channels").insert({
    name,
    language: text(form, "language") || null,
    countries: text(form, "countries") || null,
    link: text(form, "link") || null,
    admins: text(form, "admins") || null,
    participants: participants ? Number(participants) : null,
    status: text(form, "status") || "active",
  });
  if (error) return { ok: false, error: error.message };
  await audit("whatsapp", "create-channel", gate.profile.id, name);
  return done("/admin/partnership/whatsapp");
}

export async function saveMaterial(form: FormData): Promise<Result> {
  const gate = await partnershipDb();
  if (!gate.db || !gate.profile) return { ok: false, error: gate.error ?? "Sem acesso." };
  const title = text(form, "title");
  if (!title) return { ok: false, error: "Informe o título." };
  const { error } = await gate.db.from("partnership_materials").insert({
    title,
    kind: text(form, "kind") || "text",
    body: text(form, "body") || null,
    url: text(form, "url") || null,
    language: text(form, "language") || null,
  });
  if (error) return { ok: false, error: error.message };
  return done("/admin/partnership/whatsapp");
}

export async function saveLastlinkRule(form: FormData): Promise<Result> {
  const gate = await partnershipDb(true);
  if (!gate.db || !gate.profile) return { ok: false, error: gate.error ?? "Sem acesso." };
  const product = text(form, "product");
  if (!product) return { ok: false, error: "Informe o produto." };
  const percent = text(form, "percent");
  const { error } = await gate.db.from("partnership_lastlink_rules").insert({
    product,
    campaign: text(form, "campaign") || null,
    rule_kind: text(form, "rule_kind") || "affiliate",
    percent: percent ? Number(percent) : null,
    valid_from: text(form, "valid_from") || null,
    valid_until: text(form, "valid_until") || null,
    notes: text(form, "notes") || null,
    active: true,
  });
  if (error) return { ok: false, error: error.message };
  await audit("lastlink", "rule", gate.profile.id, product);
  return done("/admin/partnership/lastlink");
}

export async function saveReward(form: FormData): Promise<Result> {
  const gate = await partnershipDb();
  if (!gate.db || !gate.profile) return { ok: false, error: gate.error ?? "Sem acesso." };
  const title = text(form, "title");
  if (!title) return { ok: false, error: "Informe a recompensa." };
  const { error } = await gate.db.from("partnership_rewards").insert({
    title,
    category: text(form, "category") || "outros",
    period: text(form, "period") || null,
    budget: text(form, "budget") ? Number(text(form, "budget")) : null,
    notes: text(form, "notes") || null,
  });
  if (error) return { ok: false, error: error.message };
  return done("/admin/partnership/rewards");
}

export async function grantReward(form: FormData): Promise<Result> {
  const gate = await partnershipDb(true);
  if (!gate.db || !gate.profile) return { ok: false, error: gate.error ?? "Sem acesso." };
  const { error } = await gate.db.from("partnership_reward_grants").insert({
    reward_id: text(form, "reward_id") || null,
    partner_id: text(form, "partner_id") || null,
    period: text(form, "period") || null,
    status: text(form, "status") || "pending",
    note: text(form, "note") || null,
  });
  if (error) return { ok: false, error: error.message };
  await audit("rewards", "grant", gate.profile.id, text(form, "status") || "pending");
  return done("/admin/partnership/rewards");
}

export async function saveAnalyst(form: FormData): Promise<Result> {
  const gate = await partnershipDb();
  if (!gate.db || !gate.profile) return { ok: false, error: gate.error ?? "Sem acesso." };
  const name = text(form, "name");
  if (!name) return { ok: false, error: "Informe o nome." };
  const { count } = await gate.db.from("partnership_analysts").select("id", { count: "exact", head: true });
  if ((count ?? 0) >= 5) return { ok: false, error: "O desk começa com no máximo 5 analistas." };
  const { error } = await gate.db.from("partnership_analysts").insert({
    name,
    country: text(form, "country") || null,
    language: text(form, "language") || null,
    specialty: text(form, "specialty") || null,
    bio: text(form, "bio") || null,
    experience: text(form, "experience") || null,
    documents: text(form, "documents") || null,
  });
  if (error) return { ok: false, error: error.message };
  return done("/admin/partnership/research");
}

export async function saveDeskSignal(form: FormData): Promise<Result> {
  const gate = await partnershipDb();
  if (!gate.db || !gate.profile) return { ok: false, error: gate.error ?? "Sem acesso." };
  const { error } = await gate.db.from("partnership_desk_signals").insert({
    analyst_id: text(form, "analyst_id") || null,
    asset: text(form, "asset") || null,
    direction: text(form, "direction") || null,
    entry: text(form, "entry") || null,
    stop: text(form, "stop") || null,
    targets: text(form, "targets") || null,
    risk_reward: text(form, "risk_reward") || null,
    horizon: text(form, "horizon") || null,
    rationale: text(form, "rationale") || null,
    status: "draft",
  });
  if (error) return { ok: false, error: error.message };
  await audit("research", "signal-draft", gate.profile.id, text(form, "asset"));
  return done("/admin/partnership/research");
}

export async function saveOffice(form: FormData): Promise<Result> {
  const gate = await partnershipDb();
  if (!gate.db || !gate.profile) return { ok: false, error: gate.error ?? "Sem acesso." };
  const country = text(form, "country");
  if (!country) return { ok: false, error: "Informe o país." };
  const { error } = await gate.db.from("partnership_offices").insert({
    country,
    city: text(form, "city") || null,
    leader_name: text(form, "leader_name") || null,
    objective: text(form, "objective") || null,
    team: text(form, "team") || null,
    budget: text(form, "budget") ? Number(text(form, "budget")) : null,
    costs: text(form, "costs") ? Number(text(form, "costs")) : null,
    projection: text(form, "projection") || null,
    legal_structure: text(form, "legal_structure") || null,
    documents: text(form, "documents") || null,
    status: "proposal",
  });
  if (error) return { ok: false, error: error.message };
  await audit("offices", "proposal", gate.profile.id, country);
  return done("/admin/partnership/escritorios");
}

export async function setOfficeStatus(form: FormData): Promise<Result> {
  const gate = await partnershipDb(true);
  if (!gate.db || !gate.profile) return { ok: false, error: gate.error ?? "Sem acesso." };
  const { error } = await gate.db.from("partnership_offices").update({ status: text(form, "status") }).eq("id", text(form, "id"));
  if (error) return { ok: false, error: error.message };
  await audit("offices", text(form, "status"), gate.profile.id, text(form, "id"));
  return done("/admin/partnership/escritorios");
}

export async function saveBrokerage(form: FormData): Promise<Result> {
  const gate = await partnershipDb(true);
  if (!gate.db || !gate.profile) return { ok: false, error: gate.error ?? "Sem acesso." };
  const name = text(form, "name");
  if (!name) return { ok: false, error: "Informe a corretora." };
  const { error } = await gate.db.from("partnership_brokerages").insert({
    name,
    country: text(form, "country") || null,
    contact: text(form, "contact") || null,
    contract_ref: text(form, "contract_ref") || null,
    started_on: text(form, "started_on") || null,
    terms: text(form, "terms") || null,
    instruments: text(form, "instruments") || null,
    pay_rules: text(form, "pay_rules") || null,
  });
  if (error) return { ok: false, error: error.message };
  return done("/admin/partnership/corretoras");
}

export async function saveBrokerageClient(form: FormData): Promise<Result> {
  const gate = await partnershipDb(true);
  if (!gate.db || !gate.profile) return { ok: false, error: gate.error ?? "Sem acesso." };
  const safeId = text(form, "safe_id");
  if (!safeId) return { ok: false, error: "Informe o identificador seguro." };
  const { error } = await gate.db.from("partnership_brokerage_clients").insert({
    brokerage_id: text(form, "brokerage_id") || null,
    safe_id: safeId,
    partner_id: text(form, "partner_id") || null,
    country: text(form, "country") || null,
    assigned_at: text(form, "assigned_at") || null,
  });
  if (error) return { ok: false, error: error.message };
  return done("/admin/partnership/corretoras");
}

export async function saveBrokerageStatement(form: FormData): Promise<Result> {
  const gate = await partnershipDb(true);
  if (!gate.db || !gate.profile) return { ok: false, error: gate.error ?? "Sem acesso." };
  const { error } = await gate.db.from("partnership_brokerage_statements").insert({
    brokerage_id: text(form, "brokerage_id") || null,
    period: text(form, "period") || null,
    volume: text(form, "volume") ? Number(text(form, "volume")) : null,
    lots: text(form, "lots") ? Number(text(form, "lots")) : null,
    instruments: text(form, "instruments") || null,
    calculated: text(form, "calculated") ? Number(text(form, "calculated")) : null,
    adjustments: text(form, "adjustments") ? Number(text(form, "adjustments")) : null,
    received: text(form, "received") ? Number(text(form, "received")) : null,
    pending: text(form, "pending") ? Number(text(form, "pending")) : null,
    note: text(form, "note") || null,
  });
  if (error) return { ok: false, error: error.message };
  await audit("brokerage", "statement", gate.profile.id, text(form, "period"));
  return done("/admin/partnership/corretoras");
}

export async function saveEquity(form: FormData): Promise<Result> {
  const gate = await partnershipDb(true);
  if (!gate.db || !gate.profile) return { ok: false, error: gate.error ?? "Sem acesso." };
  const label = text(form, "label");
  if (!label) return { ok: false, error: "Informe a identificação." };
  const { error } = await gate.db.from("partnership_equity").insert({
    label,
    instrument: text(form, "instrument") || null,
    rights: text(form, "rights") || null,
    approved_percent: text(form, "approved_percent") ? Number(text(form, "approved_percent")) : null,
    valid_from: text(form, "valid_from") || null,
    valid_until: text(form, "valid_until") || null,
    documents: text(form, "documents") || null,
    status: "draft",
  });
  if (error) return { ok: false, error: error.message };
  await audit("equity", "create", gate.profile.id, label);
  return done("/admin/partnership/governanca");
}

export async function saveDistribution(form: FormData): Promise<Result> {
  const gate = await partnershipDb(true);
  if (!gate.db || !gate.profile) return { ok: false, error: gate.error ?? "Sem acesso." };
  const { error } = await gate.db.from("partnership_distributions").insert({
    equity_id: text(form, "equity_id") || null,
    period: text(form, "period") || null,
    amount: text(form, "amount") ? Number(text(form, "amount")) : null,
    note: text(form, "note") || null,
    approved: false,
  });
  if (error) return { ok: false, error: error.message };
  return done("/admin/partnership/governanca");
}
