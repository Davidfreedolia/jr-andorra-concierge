import { Section } from "@/components/admin/AdminUI";
import { AreaChip } from "@/components/admin/StaffChip";
import { StatusPill } from "@/components/area/StatusPill";
import { dateTime, notesForClient, staffById } from "@/mocks/staff";

/**
 * Comunicacio interna del client. Dos canals al mateix fil: el que queda entre
 * nosaltres i el que s'ha dit al client. Barrejar-los es com es perd el context;
 * separar-los en dues eines es com es perd la conversa.
 */
export function ClientNotes({ clientId }: { clientId: string }) {
  const notes = notesForClient(clientId);

  return (
    <Section
      title="Comunicació interna"
      aside={
        <span className="flex gap-2">
          <button type="button" className="jr-button jr-button-quiet">
            Nota interna
          </button>
          <button type="button" className="jr-button jr-button-quiet">
            Escriure al client
          </button>
        </span>
      }
    >
      {notes.length === 0 ? (
        <p className="jr-area-empty jr-measure">Encara no hi ha cap anotació d'aquest client.</p>
      ) : (
        <div className="flex flex-col">
          {notes.map((note) => {
            const author = staffById(note.authorId);
            return (
              <article key={note.id} className="jr-admin-note">
                <span className="jr-admin-avatar" aria-hidden="true">
                  {author?.initials ?? "··"}
                </span>
                <div className="flex min-w-0 flex-col">
                  <div className="jr-admin-notemeta">
                    <span className="text-sm text-foreground">{author?.name ?? "Desconegut"}</span>
                    <span className="text-xs text-muted-foreground">{dateTime(note.at)}</span>
                    {note.area ? <AreaChip area={note.area} /> : null}
                    <StatusPill
                      tone={note.channel === "client" ? "good" : "neutral"}
                      label={note.channel === "client" ? "Dit al client" : "Intern"}
                    />
                  </div>
                  <p className="jr-measure text-sm text-muted-foreground">{note.body}</p>
                  {note.mentions.length > 0 ? (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Avisats:{" "}
                      {note.mentions
                        .map((id) => staffById(id)?.name ?? id)
                        .join(" · ")}
                    </p>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <p className="jr-measure text-sm text-muted-foreground">
        Les notes internes no surten mai a l'àrea del client. El que es marca com a dit al client
        queda al seu historial i és el que li apareix a la seva pantalla.
      </p>
    </Section>
  );
}
