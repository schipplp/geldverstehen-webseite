-- Cookielose Reichweitenmessung der Coaching-Seite (geldverstehen.de/coaching).
-- Im Supabase-Projekt GELD VERSTEHEN bereits eingespielt (24.11.2026).
-- Geschrieben wird ausschließlich von der Edge Function coaching-zaehler.
-- Keine IP-Adressen, keine Kennungen, die im Browser gespeichert werden.
create table public.coaching_ereignisse (
  id bigint generated always as identity primary key,
  zeit timestamptz not null default now(),
  aufruf uuid,          -- Zufallskennung eines einzelnen Seitenaufrufs (nur im Arbeitsspeicher der Seite)
  ereignis text not null,
  detail text,
  quelle text,
  medium text,
  kampagne text,
  verweis text,         -- Host der verweisenden Seite
  geraet text           -- handy | desktop
);
alter table public.coaching_ereignisse enable row level security;
create index coaching_ereignisse_zeit_idx on public.coaching_ereignisse (zeit);

-- Tagesauswertung je Quelle.
create view public.coaching_auswertung with (security_invoker = true) as
select
  (zeit at time zone 'Europe/Berlin')::date as tag,
  coalesce(nullif(quelle, ''), '(ohne Kennung)') as quelle,
  count(*) filter (where ereignis = 'seitenaufruf') as seitenaufrufe,
  count(*) filter (where ereignis = 'formular_gesehen') as formular_gesehen,
  count(*) filter (where ereignis = 'klick_bewerben') as klicks_bewerben,
  count(*) filter (where ereignis = 'formular_start') as formular_begonnen,
  count(*) filter (where ereignis = 'bewerbung_gesendet') as bewerbungen
from public.coaching_ereignisse
group by 1, 2;
