import { listRows } from "../../../../../src/partnership/db";
import { saveChannel, saveMaterial } from "../../../../../src/partnership/actions";
import { ActionForm, DataTable, Field, SelectField } from "../../../../../src/partnership/ui";

export default async function WhatsappPage() {
  const channels = await listRows("partnership_whatsapp_channels");
  const materials = await listRows("partnership_materials");
  return (
    <div className="space-y-8">
      <h2 className="font-serif text-3xl text-paper">WhatsApp Operations</h2>
      <p className="text-sm text-paper/60">
        Estar em um canal não atribui venda. A atribuição segue o identificador da plataforma de vendas.
      </p>
      {channels.error ? <p className="text-sm text-fall">{channels.error}</p> : null}
      <section className="admin-panel p-5">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Canal</h3>
        <ActionForm action={saveChannel}>
          <div className="grid gap-3 md:grid-cols-2">
            <Field name="name" label="Nome do canal" />
            <Field name="language" label="Idioma" />
            <Field name="countries" label="Países atendidos" />
            <Field name="link" label="Link" />
            <Field name="admins" label="Administradores" />
            <Field name="participants" label="Participantes, se disponível" type="number" />
          </div>
        </ActionForm>
      </section>
      <DataTable
        columns={[
          { key: "name", label: "Canal" },
          { key: "language", label: "Idioma" },
          { key: "countries", label: "Países" },
          { key: "status", label: "Status" },
          { key: "participants", label: "Participantes" },
        ]}
        rows={channels.rows}
      />
      <section className="admin-panel p-5">
        <h3 className="mb-4 text-sm font-bold uppercase tracking-wider">Materiais</h3>
        <ActionForm action={saveMaterial}>
          <div className="grid gap-3 md:grid-cols-2">
            <Field name="title" label="Título" />
            <SelectField
              name="kind"
              label="Tipo"
              options={[
                { value: "image", label: "Imagem" },
                { value: "video", label: "Vídeo" },
                { value: "text", label: "Texto" },
                { value: "presentation", label: "Apresentação" },
                { value: "sales_link", label: "Link de venda" },
                { value: "institutional", label: "Institucional" },
              ]}
            />
            <Field name="url" label="URL" />
            <Field name="language" label="Idioma" />
            <Field name="body" label="Texto ou observação" />
          </div>
        </ActionForm>
      </section>
      <DataTable
        columns={[
          { key: "title", label: "Material" },
          { key: "kind", label: "Tipo" },
          { key: "language", label: "Idioma" },
          { key: "url", label: "URL" },
        ]}
        rows={materials.rows}
      />
    </div>
  );
}
