-- Elite: Janeiro/2021 (26 sinais, +480 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2021, 0, 'Janeiro', 26, 480, '+480 pips', 'Finalizado', array['USD/CAD', 'GBP/CHF', 'GBP/CAD', 'AUD/CAD', 'NZD/USD', 'GBP/NZD', 'EUR/AUD', 'AUD/NZD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Janeiro/2021';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('USD/CAD', 'Compra', 'closed', 24, '+24 pips', 'Janeiro/2021', '2021-01-05', 'Finalizado', 1, true, 'take', 'elite', 1, 1.26504, 1.28583, 1.26055),
  ('GBP/CHF', 'Venda', 'closed', 23, '+23 pips', 'Janeiro/2021', '2021-01-06', 'Finalizado', 2, true, 'take', 'elite', 2, 1.19522, 1.19297, 1.19721),
  ('GBP/CAD', 'Compra', 'closed', -46, '-46 pips', 'Janeiro/2021', '2021-01-07', 'Finalizado', 3, true, 'stop', 'elite', 3, 1.72875, 1.73159, 1.7242),
  ('AUD/CAD', 'Compra', 'closed', -24, '-24 pips', 'Janeiro/2021', '2021-01-08', 'Finalizado', 4, true, 'stop', 'elite', 4, 0.98703, 0.98905, 0.98463),
  ('NZD/USD', 'Compra', 'closed', -30, '-30 pips', 'Janeiro/2021', '2021-01-08', 'Finalizado', 5, true, 'stop', 'elite', 5, 0.72674, 0.73008, 0.72379),
  ('GBP/NZD', 'Compra', 'closed', 51, '+51 pips', 'Janeiro/2021', '2021-01-08', 'Finalizado', 6, true, 'take', 'elite', 6, 1.8715, 1.87656, 1.86793),
  ('EUR/AUD', 'Compra', 'closed', 39, '+39 pips', 'Janeiro/2021', '2021-01-11', 'Finalizado', 7, true, 'take', 'elite', 7, 1.57873, 1.58265, 1.57137),
  ('AUD/NZD', 'Venda', 'closed', 10, '+10 pips', 'Janeiro/2021', '2021-01-11', 'Finalizado', 8, true, 'take', 'elite', 8, 1.0719, 1.06589, 1.07546),
  ('USD/CAD', 'Compra', 'closed', -78, '-78 pips', 'Janeiro/2021', '2021-01-12', 'Finalizado', 9, true, 'stop', 'elite', 9, 1.27742, 1.29273, 1.26959),
  ('EUR/JPY', 'Venda', 'closed', 113, '+113 pips', 'Janeiro/2021', '2021-01-12', 'Finalizado', 10, true, 'take', 'elite', 10, 126.496, 125.364, 127.362),
  ('USD/CHF', 'Compra', 'closed', 20, '+20 pips', 'Janeiro/2021', '2021-01-13', 'Finalizado', 11, true, 'take', 'elite', 11, 0.88864, 0.89359, 0.88297),
  ('EUR/CAD', 'Compra', 'closed', 28, '+28 pips', 'Janeiro/2021', '2021-01-14', 'Finalizado', 12, true, 'take', 'elite', 12, 1.53677, 1.53956, 1.53674),
  ('USD/CHF', 'Compra', 'closed', 12, '+12 pips', 'Janeiro/2021', '2021-01-15', 'Finalizado', 13, true, 'take', 'elite', 13, 0.8896, 0.89359, 0.88297),
  ('AUD/CAD', 'Venda', 'closed', 30, '+30 pips', 'Janeiro/2021', '2021-01-18', 'Finalizado', 14, true, 'take', 'elite', 14, 0.98001, 0.97019, 0.98516),
  ('GBP/CAD', 'Compra', 'closed', 30, '+30 pips', 'Janeiro/2021', '2021-01-19', 'Finalizado', 15, true, 'take', 'elite', 15, 1.73403, 1.74108, 1.72974),
  ('AUD/CAD', 'Venda', 'closed', 40, '+40 pips', 'Janeiro/2021', '2021-01-19', 'Finalizado', 16, true, 'take', 'elite', 16, null, null, null),
  ('CAD/CHF', 'Compra', 'closed', -18, '-18 pips', 'Janeiro/2021', '2021-01-21', 'Finalizado', 17, true, 'stop', 'elite', 17, 0.69783, 0.69936, 0.69607),
  ('EUR/GBP', 'Compra', 'closed', 15, '+15 pips', 'Janeiro/2021', '2021-01-22', 'Finalizado', 18, true, 'take', 'elite', 18, 0.89702, 0.88874, 0.8919),
  ('USD/JPY', 'Compra', 'closed', 68, '+68 pips', 'Janeiro/2021', '2021-01-25', 'Finalizado', 19, true, 'take', 'elite', 19, 103.774, 104.458, 103.381),
  ('USD/CAD', 'Compra', 'closed', 39, '+39 pips', 'Janeiro/2021', '2021-01-25', 'Finalizado', 20, true, 'take', 'elite', 20, 1.27232, 1.27624, 1.268),
  ('EUR/AUD', 'Compra', 'closed', -50, '-50 pips', 'Janeiro/2021', '2021-01-26', 'Finalizado', 21, true, 'stop', 'elite', 21, 1.57872, 1.59, 1.56727),
  ('EUR/AUD', 'Compra', 'closed', 26, '+26 pips', 'Janeiro/2021', '2021-01-26', 'Finalizado', 22, true, 'take', 'elite', 22, 1.57112, 1.57369, 1.56933),
  ('EUR/CHF', 'Compra', 'closed', 25, '+25 pips', 'Janeiro/2021', '2021-01-26', 'Finalizado', 23, true, 'take', 'elite', 23, 1.079, 1.08151, 1.07564),
  ('AUD/JPY', 'Venda', 'closed', 61, '+61 pips', 'Janeiro/2021', '2021-01-27', 'Finalizado', 24, true, 'take', 'elite', 24, 79.863, 79.254, 80.308),
  ('WTI', 'Venda', 'closed', 30, '+30 pips', 'Janeiro/2021', '2021-01-28', 'Finalizado', 25, true, 'take', 'elite', 25, 0.52286, 0.50483, 0.52994),
  ('USD/CAD', 'Compra', 'closed', 42, '+42 pips', 'Janeiro/2021', '2021-01-29', 'Finalizado', 26, true, 'take', 'elite', 26, 1.27757, 1.2889, 1.27005);
