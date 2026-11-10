-- Free (níveis públicos) vs Elite (alvo/stop ocultos no relatório)

alter table public.elite_operations
add column if not exists signal_tier text not null default 'elite';

alter table public.elite_operations
drop constraint if exists elite_operations_signal_tier_check;

alter table public.elite_operations
add constraint elite_operations_signal_tier_check check (signal_tier in ('free', 'elite'));

create index if not exists elite_operations_signal_tier_idx on public.elite_operations (signal_tier);
