-- Elite: Maio/2021 (28 sinais, +770 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2021, 4, 'Maio', 28, 770, '+770 pips', 'Finalizado', array['XAU/USD', 'USD/CHF', 'EUR/CAD', 'USD/JPY', 'GBP/AUD', 'USD/CAD', 'EUR/USD', 'EUR/AUD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Maio/2021';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('XAU/USD', 'Compra', 'closed', 90, '+90 pips', 'Maio/2021', '2021-05-03', 'Finalizado', 1, true, 'take', 'elite', 1, 1782.01, 1784.2, 1767.89),
  ('USD/CHF', 'Compra', 'closed', 40, '+40 pips', 'Maio/2021', '2021-05-03', 'Finalizado', 2, true, 'take', 'elite', 2, 0.91251, 0.91945, 0.90744),
  ('EUR/CAD', 'Compra', 'closed', -25, '-25 pips', 'Maio/2021', '2021-05-03', 'Finalizado', 3, true, 'stop', 'elite', 3, 1.48124, 1.48755, 1.4787),
  ('XAU/USD', 'Compra', 'closed', -65, '-65 pips', 'Maio/2021', '2021-05-04', 'Finalizado', 4, true, 'stop', 'elite', 4, 1782.11, 1794, 1775.57),
  ('USD/CHF', 'Compra', 'closed', -62, '-62 pips', 'Maio/2021', '2021-05-05', 'Finalizado', 5, true, 'stop', 'elite', 5, 0.91359, 0.91945, 0.90744),
  ('EUR/CAD', 'Compra', 'closed', 30, '+30 pips', 'Maio/2021', '2021-05-06', 'Finalizado', 6, true, 'take', 'elite', 6, 1.47031, 1.47933, 1.46896),
  ('USD/JPY', 'Venda', 'closed', 39, '+39 pips', 'Maio/2021', '2021-05-06', 'Finalizado', 7, true, 'take', 'elite', 7, 109.006, 108.614, 109.434),
  ('GBP/AUD', 'Venda', 'closed', -45, '-45 pips', 'Maio/2021', '2021-05-07', 'Finalizado', 8, true, 'stop', 'elite', 8, 1.78082, 1.75279, 1.80854),
  ('USD/CAD', 'Compra', 'closed', -34, '-34 pips', 'Maio/2021', '2021-05-11', 'Finalizado', 9, true, 'stop', 'elite', 9, 1.21083, 1.2155, 1.20742),
  ('EUR/USD', 'Venda', 'closed', 43, '+43 pips', 'Maio/2021', '2021-05-11', 'Finalizado', 10, true, 'take', 'elite', 10, 1.21434, 1.21002, 1.21885),
  ('EUR/AUD', 'Compra', 'closed', 77, '+77 pips', 'Maio/2021', '2021-05-11', 'Finalizado', 11, true, 'take', 'elite', 11, 1.55251, 1.56429, 1.54359),
  ('USD/CAD', 'Compra', 'closed', 45, '+45 pips', 'Maio/2021', '2021-05-12', 'Finalizado', 12, true, 'take', 'elite', 12, null, null, null),
  ('EUR/AUD', 'Compra', 'closed', 50, '+50 pips', 'Maio/2021', '2021-05-12', 'Finalizado', 13, true, 'take', 'elite', 13, 1.5621, 1.57921, 1.55653),
  ('EUR/AUD', 'Compra', 'closed', 30, '+30 pips', 'Maio/2021', '2021-05-13', 'Finalizado', 14, true, 'take', 'elite', 14, null, null, null),
  ('EUR/NZD', 'Compra', 'closed', 30, '+30 pips', 'Maio/2021', '2021-05-13', 'Finalizado', 15, true, 'take', 'elite', 15, 1.68439, 1.69276, 1.67772),
  ('EUR/GBP', 'Compra', 'closed', 22, '+22 pips', 'Maio/2021', '2021-05-13', 'Finalizado', 16, true, 'take', 'elite', 16, 0.86047, 0.86262, 0.85767),
  ('USD/JPY', 'Venda', 'closed', 43, '+43 pips', 'Maio/2021', '2021-05-17', 'Finalizado', 17, true, 'take', 'elite', 17, 109.127, 107.855, 109.452),
  ('EUR/NZD', 'Compra', 'closed', 60, '+60 pips', 'Maio/2021', '2021-05-18', 'Finalizado', 18, true, 'take', 'elite', 18, 1.68663, 1.69262, 1.68011),
  ('CAD/JPY', 'Venda', 'closed', -28, '-28 pips', 'Maio/2021', '2021-05-18', 'Finalizado', 19, true, 'stop', 'elite', 19, 90.185, 89.94, 90.467),
  ('USD/CAD', 'Compra', 'closed', -26, '-26 pips', 'Maio/2021', '2021-05-19', 'Finalizado', 20, true, 'stop', 'elite', 20, 1.21218, 1.21729, 1.20954),
  ('CAD/JPY', 'Venda', 'closed', 32, '+32 pips', 'Maio/2021', '2021-05-19', 'Finalizado', 21, true, 'take', 'elite', 21, 89.968, 89.65, 90.28),
  ('AUD/USD', 'Venda', 'closed', 80, '+80 pips', 'Maio/2021', '2021-05-21', 'Finalizado', 22, true, 'take', 'elite', 22, 0.77401, 0.76207, 0.77959),
  ('GBP/CHF', 'Venda', 'closed', 90, '+90 pips', 'Maio/2021', '2021-05-24', 'Finalizado', 23, true, 'take', 'elite', 23, 1.26927, 1.2491, 1.27305),
  ('EUR/AUD', 'Compra', 'closed', -36, '-36 pips', 'Maio/2021', '2021-05-24', 'Finalizado', 24, true, 'stop', 'elite', 24, 1.57615, 1.57968, 1.57259),
  ('USD/CAD', 'Compra', 'closed', 42, '+42 pips', 'Maio/2021', '2021-05-25', 'Finalizado', 25, true, 'take', 'elite', 25, 1.20582, 1.21, 1.203),
  ('WTI', 'Venda', 'closed', 121, '+121 pips', 'Maio/2021', '2021-05-26', 'Finalizado', 26, true, 'take', 'elite', 26, 0.65601, 0.64396, 0.6624),
  ('EUR/CAD', 'Compra', 'closed', 56, '+56 pips', 'Maio/2021', '2021-05-28', 'Finalizado', 27, true, 'take', 'elite', 27, 1.47439, 1.48, 1.46899),
  ('EUR/CAD', 'Compra', 'closed', 71, '+71 pips', 'Maio/2021', '2021-05-31', 'Finalizado', 28, true, 'take', 'elite', 28, 1.47287, 1.48, 1.46899);
