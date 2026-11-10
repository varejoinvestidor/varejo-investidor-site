-- Elite: Julho/2023 (18 sinais, +265 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2023, 6, 'Julho', 18, 265, '+265 pips', 'Finalizado', array['EUR/USD', 'EUR/CAD', 'GBP/NZD', 'AUD/NZD', 'XAU/USD', 'EUR/JPY', 'USD/JPY', 'GBP/AUD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Julho/2023';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('EUR/USD', 'Venda', 'closed', 39, '+39 pips', 'Julho/2023', '2023-07-03', 'Finalizado', 1, true, 'take', 'elite', 1, 1.09044, 1.0865, 1.094),
  ('EUR/CAD', 'Venda', 'closed', -32, '-32 pips', 'Julho/2023', '2023-07-05', 'Finalizado', 2, true, 'stop', 'elite', 2, 1.44127, 1.43532, 1.4445),
  ('GBP/NZD', 'Venda', 'closed', -23, '-23 pips', 'Julho/2023', '2023-07-05', 'Finalizado', 3, true, 'stop', 'elite', 3, 2.054, 2.0499, 2.05633),
  ('AUD/NZD', 'Compra', 'closed', 61, '+61 pips', 'Julho/2023', '2023-07-06', 'Finalizado', 4, true, 'take', 'elite', 4, 1.0759, 1.082, 1.0708),
  ('EUR/USD', 'Compra', 'closed', 53, '+53 pips', 'Julho/2023', '2023-07-10', 'Finalizado', 5, true, 'take', 'elite', 5, 1.10065, 1.10595, 1.09657),
  ('EUR/CAD', 'Venda', 'closed', 36, '+36 pips', 'Julho/2023', '2023-07-11', 'Finalizado', 6, true, 'take', 'elite', 6, 1.45656, 1.453, 1.4603),
  ('XAU/USD', 'Venda', 'closed', 1, '+1 pips', 'Julho/2023', '2023-07-12', 'Finalizado', 7, true, 'take', 'elite', 7, 1956.86, null, 1958.51),
  ('EUR/JPY', 'Venda', 'closed', -41, '-41 pips', 'Julho/2023', '2023-07-13', 'Finalizado', 8, true, 'stop', 'elite', 8, 154.339, 153.7, 154.745),
  ('XAU/USD', 'Compra', 'closed', 20, '+20 pips', 'Julho/2023', '2023-07-17', 'Finalizado', 9, true, 'take', 'elite', 9, 1958, 1960, 1955.38),
  ('USD/JPY', 'Compra', 'closed', -18, '-18 pips', 'Julho/2023', '2023-07-18', 'Finalizado', 10, true, 'stop', 'elite', 10, 138.679, 140, 138.5),
  ('GBP/AUD', 'Venda', 'closed', 80, '+80 pips', 'Julho/2023', '2023-07-19', 'Finalizado', 11, true, 'take', 'elite', 11, 1.906, 1.897, 1.9158),
  ('NZD/USD', 'Compra', 'closed', 5, '+5 pips', 'Julho/2023', '2023-07-21', 'Finalizado', 12, true, 'take', 'elite', 12, 0.618, 0.622, 0.615),
  ('EUR/GBP', 'Venda', 'closed', 10, '+10 pips', 'Julho/2023', '2023-07-24', 'Finalizado', 13, true, 'take', 'elite', 13, 0.86361, 0.8607, 0.86578),
  ('GBP/CAD', 'Compra', 'closed', 124, '+124 pips', 'Julho/2023', '2023-07-25', 'Finalizado', 14, true, 'take', 'elite', 14, 1.684, 1.6964, 1.6894),
  ('USD/JPY', 'Venda', 'closed', 40, '+40 pips', 'Julho/2023', '2023-07-25', 'Finalizado', 15, true, 'take', 'elite', 15, 140.884, 139.9, 141.644),
  ('USD/CHF', 'Venda', 'closed', -25, '-25 pips', 'Julho/2023', '2023-07-28', 'Finalizado', 16, true, 'stop', 'elite', 16, 0.867, 0.8649, 0.8695),
  ('EUR/GBP', 'Compra', 'closed', 15, '+15 pips', 'Julho/2023', '2023-07-30', 'Finalizado', 17, true, 'take', 'elite', 17, 0.8575, 0.859, 0.8545),
  ('GBP/USD', 'Venda', 'closed', -80, '-80 pips', 'Julho/2023', '2023-07-31', 'Finalizado', 18, true, 'stop', 'elite', 18, 1.284, 1.288, 1.276);
