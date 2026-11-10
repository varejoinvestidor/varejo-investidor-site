-- Relatório Elite: setembro/2022 (37 sinais, +596 pips consolidados)

insert into public.elite_monthly_reports (
  year,
  month_index,
  month_label,
  signals,
  pips,
  result_label,
  status_label,
  assets
)
values (
  2022,
  8,
  'Setembro',
  37,
  596,
  '+596 pips',
  'Finalizado',
  array['XAU/USD', 'USOIL', 'GBP/USD', 'EUR/USD', 'GBP/JPY']::text[]
)
on conflict (year, month_index) do update
set
  month_label = excluded.month_label,
  signals = excluded.signals,
  pips = excluded.pips,
  result_label = excluded.result_label,
  status_label = excluded.status_label,
  assets = excluded.assets,
  updated_at = now();

delete from public.elite_operations
where report_month = 'Setembro/2022';

insert into public.elite_operations (
  asset,
  direction,
  status,
  result_pips,
  result_label,
  report_month,
  traded_on,
  updated_label,
  sort_order,
  show_public,
  close_outcome,
  signal_tier
)
values
  ('EUR/JPY', 'Venda', 'closed', -10, '-10 pips', 'Setembro/2022', '2022-09-01', 'Finalizado', 1, true, 'stop', 'elite'),
  ('GBP/USD', 'Compra', 'closed', -30, '-30 pips', 'Setembro/2022', '2022-09-02', 'Finalizado', 2, true, 'stop', 'elite'),
  ('XAU/USD', 'Compra', 'closed', 62, '+62 pips', 'Setembro/2022', '2022-09-02', 'Finalizado', 3, true, 'take', 'elite'),
  ('GBP/USD', 'Compra', 'closed', 20, '+20 pips', 'Setembro/2022', '2022-09-02', 'Finalizado', 4, true, 'take', 'elite'),
  ('USOIL', 'Compra', 'closed', 153, '+153 pips', 'Setembro/2022', '2022-09-04', 'Finalizado', 5, true, 'take', 'elite'),
  ('XAU/USD', 'Compra', 'closed', 52, '+52 pips', 'Setembro/2022', '2022-09-05', 'Finalizado', 6, true, 'take', 'elite'),
  ('EUR/CAD', 'Venda', 'closed', -96, '-96 pips', 'Setembro/2022', '2022-09-06', 'Finalizado', 7, true, 'stop', 'elite'),
  ('USOIL', 'Venda', 'closed', 70, '+70 pips', 'Setembro/2022', '2022-09-06', 'Finalizado', 8, true, 'take', 'elite'),
  ('EUR/CHF', 'Compra', 'closed', -44, '-44 pips', 'Setembro/2022', '2022-09-07', 'Finalizado', 9, true, 'stop', 'elite'),
  ('GBP/USD', 'Compra', 'closed', 33, '+33 pips', 'Setembro/2022', '2022-09-08', 'Finalizado', 10, true, 'take', 'elite'),
  ('XAU/USD', 'Compra', 'closed', 23, '+23 pips', 'Setembro/2022', '2022-09-08', 'Finalizado', 11, true, 'take', 'elite'),
  ('USOIL', 'Venda', 'closed', 27, '+27 pips', 'Setembro/2022', '2022-09-09', 'Finalizado', 12, true, 'take', 'elite'),
  ('GBP/NZD', 'Compra', 'closed', 35, '+35 pips', 'Setembro/2022', '2022-09-12', 'Finalizado', 13, true, 'take', 'elite'),
  ('CHF/JPY', 'Venda', 'closed', -65, '-65 pips', 'Setembro/2022', '2022-09-13', 'Finalizado', 14, true, 'stop', 'elite'),
  ('USOIL', 'Venda', 'closed', 92, '+92 pips', 'Setembro/2022', '2022-09-13', 'Finalizado', 15, true, 'take', 'elite'),
  ('GBP/AUD', 'Compra', 'closed', 72, '+72 pips', 'Setembro/2022', '2022-09-14', 'Finalizado', 16, true, 'take', 'elite'),
  ('EUR/USD', 'Compra', 'closed', 30, '+30 pips', 'Setembro/2022', '2022-09-14', 'Finalizado', 17, true, 'take', 'elite'),
  ('XAU/USD', 'Compra', 'closed', -32, '-32 pips', 'Setembro/2022', '2022-09-14', 'Finalizado', 18, true, 'stop', 'elite'),
  ('EUR/CAD', 'Compra', 'closed', 34, '+34 pips', 'Setembro/2022', '2022-09-15', 'Finalizado', 19, true, 'take', 'elite'),
  ('EUR/USD', 'Compra', 'closed', -18, '-18 pips', 'Setembro/2022', '2022-09-15', 'Finalizado', 20, true, 'stop', 'elite'),
  ('XAU/USD', 'Venda', 'closed', 41, '+41 pips', 'Setembro/2022', '2022-09-16', 'Finalizado', 21, true, 'take', 'elite'),
  ('CAD/JPY', 'Compra', 'closed', 30, '+30 pips', 'Setembro/2022', '2022-09-19', 'Finalizado', 22, true, 'take', 'elite'),
  ('AUD/CAD', 'Venda', 'closed', -37, '-37 pips', 'Setembro/2022', '2022-09-19', 'Finalizado', 23, true, 'stop', 'elite'),
  ('XAU/USD', 'Compra', 'closed', 34, '+34 pips', 'Setembro/2022', '2022-09-19', 'Finalizado', 24, true, 'take', 'elite'),
  ('CAD/JPY', 'Venda', 'closed', -20, '-20 pips', 'Setembro/2022', '2022-09-19', 'Finalizado', 25, true, 'stop', 'elite'),
  ('XAU/USD', 'Venda', 'closed', -74, '-74 pips', 'Setembro/2022', '2022-09-20', 'Finalizado', 26, true, 'stop', 'elite'),
  ('GBP/JPY', 'Venda', 'closed', 60, '+60 pips', 'Setembro/2022', '2022-09-21', 'Finalizado', 27, true, 'take', 'elite'),
  ('XAU/USD', 'Venda', 'closed', 67, '+67 pips', 'Setembro/2022', '2022-09-21', 'Finalizado', 28, true, 'take', 'elite'),
  ('XAU/USD', 'Compra', 'closed', 54, '+54 pips', 'Setembro/2022', '2022-09-22', 'Finalizado', 29, true, 'take', 'elite'),
  ('USD/CHF', 'Compra', 'closed', 30, '+30 pips', 'Setembro/2022', '2022-09-22', 'Finalizado', 30, true, 'take', 'elite'),
  ('XAU/USD', 'Compra', 'closed', -47, '-47 pips', 'Setembro/2022', '2022-09-22', 'Finalizado', 31, true, 'stop', 'elite'),
  ('XAU/USD', 'Compra', 'closed', 35, '+35 pips', 'Setembro/2022', '2022-09-23', 'Finalizado', 32, true, 'take', 'elite'),
  ('GBP/USD', 'Compra', 'closed', 9, '+9 pips', 'Setembro/2022', '2022-09-23', 'Finalizado', 33, true, 'take', 'elite'),
  ('GBP/CHF', 'Compra', 'closed', -30, '-30 pips', 'Setembro/2022', '2022-09-23', 'Finalizado', 34, true, 'stop', 'elite'),
  ('GBP/JPY', 'Compra', 'closed', 16, '+16 pips', 'Setembro/2022', '2022-09-23', 'Finalizado', 35, true, 'take', 'elite'),
  ('XAU/USD', 'Compra', 'closed', -20, '-20 pips', 'Setembro/2022', '2022-09-23', 'Finalizado', 36, true, 'stop', 'elite'),
  ('GBP/USD', 'Venda', 'closed', 40, '+40 pips', 'Setembro/2022', '2022-09-26', 'Finalizado', 37, true, 'take', 'elite');
