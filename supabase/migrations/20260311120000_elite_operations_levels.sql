-- Níveis de preço, número do sinal e resultado do fechamento

alter table public.elite_operations
add column if not exists signal_number int,
add column if not exists entry_price numeric(18, 6),
add column if not exists take_price numeric(18, 6),
add column if not exists stop_price numeric(18, 6),
add column if not exists close_outcome text check (close_outcome in ('take', 'stop', 'manual'));

create index if not exists elite_operations_signal_number_idx on public.elite_operations (signal_number);
