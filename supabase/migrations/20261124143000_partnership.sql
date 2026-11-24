-- Partnership no Varejo Admin. Acesso via service role depois da sessão do Publisher.
-- Não altera tabelas do Publisher nem dos relatórios Elite.

create table if not exists public.partnership_partners (
  id uuid primary key default gen_random_uuid(),
  kind text not null check (kind in ('affiliate', 'leader', 'coproducer', 'economic')),
  name text not null,
  email text,
  country text,
  language text,
  code text unique,
  leader_id uuid references public.partnership_partners (id) on delete set null,
  products text[] not null default '{}',
  status text not null default 'pending' check (status in ('pending', 'active', 'suspended', 'closed')),
  contract_instrument text,
  economic_rights text,
  approved_percent numeric,
  valid_from date,
  valid_until date,
  documentation text,
  remuneration text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.partnership_partner_events (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid not null references public.partnership_partners (id) on delete cascade,
  action text not null,
  note text,
  actor_id uuid,
  created_at timestamptz not null default now()
);

create table if not exists public.partnership_whatsapp_channels (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  language text,
  countries text,
  link text,
  leader_id uuid references public.partnership_partners (id) on delete set null,
  admins text,
  participants integer,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.partnership_materials (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  kind text not null check (kind in ('image', 'video', 'text', 'presentation', 'sales_link', 'institutional')),
  body text,
  url text,
  language text,
  owner_partner_id uuid references public.partnership_partners (id) on delete set null,
  created_at timestamptz not null default now()
);

create table if not exists public.partnership_lastlink_rules (
  id uuid primary key default gen_random_uuid(),
  product text not null,
  campaign text,
  rule_kind text not null check (rule_kind in ('affiliate', 'coproducer', 'renewal', 'unattributed')),
  percent numeric,
  valid_from date,
  valid_until date,
  active boolean not null default true,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.partnership_lastlink_events (
  id uuid primary key default gen_random_uuid(),
  external_id text not null unique,
  payload jsonb not null,
  received_at timestamptz not null default now()
);

create table if not exists public.partnership_lastlink_orders (
  id uuid primary key default gen_random_uuid(),
  external_id text not null unique,
  product text,
  buyer text,
  affiliate_code text,
  leader_code text,
  language text,
  country text,
  campaign text,
  ordered_at timestamptz,
  gross_amount numeric,
  fees numeric,
  payment_status text,
  refunded boolean not null default false,
  chargeback boolean not null default false,
  renewal boolean not null default false,
  raw jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.partnership_rewards (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  period text,
  budget numeric,
  available boolean not null default true,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.partnership_reward_grants (
  id uuid primary key default gen_random_uuid(),
  reward_id uuid references public.partnership_rewards (id) on delete set null,
  partner_id uuid references public.partnership_partners (id) on delete set null,
  period text,
  status text not null default 'pending' check (status in ('pending', 'approved', 'granted', 'rejected')),
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.partnership_analysts (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text,
  language text,
  specialty text,
  bio text,
  experience text,
  documents text,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.partnership_desk_signals (
  id uuid primary key default gen_random_uuid(),
  analyst_id uuid references public.partnership_analysts (id) on delete set null,
  asset text,
  direction text,
  entry text,
  stop text,
  targets text,
  risk_reward text,
  horizon text,
  rationale text,
  status text not null default 'draft',
  result text,
  version integer not null default 1,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.partnership_offices (
  id uuid primary key default gen_random_uuid(),
  country text not null,
  city text,
  leader_name text,
  objective text,
  team text,
  budget numeric,
  costs numeric,
  projection text,
  legal_structure text,
  documents text,
  status text not null default 'proposal' check (status in (
    'proposal', 'commercial_review', 'financial_review', 'legal_review', 'direction_approval', 'deployment', 'operating', 'rejected'
  )),
  created_at timestamptz not null default now()
);

create table if not exists public.partnership_brokerages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  country text,
  contact text,
  contract_ref text,
  started_on date,
  terms text,
  instruments text,
  pay_rules text,
  status text not null default 'active',
  created_at timestamptz not null default now()
);

create table if not exists public.partnership_brokerage_clients (
  id uuid primary key default gen_random_uuid(),
  brokerage_id uuid references public.partnership_brokerages (id) on delete cascade,
  safe_id text not null,
  partner_id uuid references public.partnership_partners (id) on delete set null,
  country text,
  status text not null default 'active',
  assigned_at date,
  created_at timestamptz not null default now()
);

create table if not exists public.partnership_brokerage_statements (
  id uuid primary key default gen_random_uuid(),
  brokerage_id uuid references public.partnership_brokerages (id) on delete cascade,
  period text,
  volume numeric,
  lots numeric,
  instruments text,
  calculated numeric,
  adjustments numeric,
  received numeric,
  pending numeric,
  note text,
  created_at timestamptz not null default now()
);

create table if not exists public.partnership_equity (
  id uuid primary key default gen_random_uuid(),
  partner_id uuid references public.partnership_partners (id) on delete set null,
  label text not null,
  instrument text,
  rights text,
  approved_percent numeric,
  valid_from date,
  valid_until date,
  documents text,
  status text not null default 'draft',
  created_at timestamptz not null default now()
);

create table if not exists public.partnership_distributions (
  id uuid primary key default gen_random_uuid(),
  equity_id uuid references public.partnership_equity (id) on delete cascade,
  period text,
  amount numeric,
  note text,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.partnership_audit (
  id uuid primary key default gen_random_uuid(),
  area text not null,
  action text not null,
  actor_id uuid,
  detail text,
  created_at timestamptz not null default now()
);

alter table public.partnership_partners enable row level security;
alter table public.partnership_partner_events enable row level security;
alter table public.partnership_whatsapp_channels enable row level security;
alter table public.partnership_materials enable row level security;
alter table public.partnership_lastlink_rules enable row level security;
alter table public.partnership_lastlink_events enable row level security;
alter table public.partnership_lastlink_orders enable row level security;
alter table public.partnership_rewards enable row level security;
alter table public.partnership_reward_grants enable row level security;
alter table public.partnership_analysts enable row level security;
alter table public.partnership_desk_signals enable row level security;
alter table public.partnership_offices enable row level security;
alter table public.partnership_brokerages enable row level security;
alter table public.partnership_brokerage_clients enable row level security;
alter table public.partnership_brokerage_statements enable row level security;
alter table public.partnership_equity enable row level security;
alter table public.partnership_distributions enable row level security;
alter table public.partnership_audit enable row level security;
