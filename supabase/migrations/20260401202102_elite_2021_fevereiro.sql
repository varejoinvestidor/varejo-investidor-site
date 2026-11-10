-- Elite: Fevereiro/2021 (25 sinais, +332 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2021, 1, 'Fevereiro', 25, 332, '+332 pips', 'Finalizado', array['GBP/JPY', 'USD/CAD', 'EUR/JPY', 'EUR/AUD', 'AUD/CAD', 'EUR/GBP', 'GBP/NZD', 'USD/CHF']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Fevereiro/2021';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('GBP/JPY', 'Venda', 'closed', 40, '+40 pips', 'Fevereiro/2021', '2021-02-01', 'Finalizado', 1, true, 'take', 'elite', 1, 143.572, 141.463, 144.135),
  ('USD/CAD', 'Compra', 'closed', 63, '+63 pips', 'Fevereiro/2021', '2021-02-01', 'Finalizado', 2, true, 'take', 'elite', 2, 1.28053, 1.28685, 1.2761),
  ('EUR/JPY', 'Venda', 'closed', 27, '+27 pips', 'Fevereiro/2021', '2021-02-01', 'Finalizado', 3, true, 'take', 'elite', 3, 126.736, 126.494, 126.981),
  ('EUR/AUD', 'Compra', 'closed', 30, '+30 pips', 'Fevereiro/2021', '2021-02-02', 'Finalizado', 4, true, 'take', 'elite', 4, 1.58435, 1.59806, 1.57434),
  ('AUD/CAD', 'Compra', 'closed', 21, '+21 pips', 'Fevereiro/2021', '2021-02-03', 'Finalizado', 5, true, 'take', 'elite', 5, 0.9746, 0.97674, 0.97119),
  ('USD/CAD', 'Compra', 'closed', 30, '+30 pips', 'Fevereiro/2021', '2021-02-04', 'Finalizado', 6, true, 'take', 'elite', 6, 1.28107, 1.29981, 1.2717),
  ('EUR/GBP', 'Compra', 'closed', 24, '+24 pips', 'Fevereiro/2021', '2021-02-05', 'Finalizado', 7, true, 'take', 'elite', 7, 0.87518, 0.87754, 0.87334),
  ('GBP/NZD', 'Venda', 'closed', -76, '-76 pips', 'Fevereiro/2021', '2021-02-08', 'Finalizado', 8, true, 'stop', 'elite', 8, 1.90033, 1.89277, 1.90645),
  ('EUR/AUD', 'Compra', 'closed', 31, '+31 pips', 'Fevereiro/2021', '2021-02-09', 'Finalizado', 9, true, 'take', 'elite', 9, 1.56686, 1.57, 1.56426),
  ('EUR/AUD', 'Compra', 'closed', -49, '-49 pips', 'Fevereiro/2021', '2021-02-10', 'Finalizado', 10, true, 'stop', 'elite', 10, 1.56989, 1.5744, 1.565),
  ('EUR/AUD', 'Compra', 'closed', -24, '-24 pips', 'Fevereiro/2021', '2021-02-12', 'Finalizado', 11, true, 'stop', 'elite', 11, 1.56735, 1.57, 1.56495),
  ('USD/CAD', 'Compra', 'closed', -35, '-35 pips', 'Fevereiro/2021', '2021-02-12', 'Finalizado', 12, true, 'stop', 'elite', 12, 1.2749, 1.27673, 1.27145),
  ('USD/CHF', 'Compra', 'closed', -6, '-6 pips', 'Fevereiro/2021', '2021-02-15', 'Finalizado', 13, true, 'stop', 'elite', 13, 0.89095, 0.8918, 0.89033),
  ('XAU/USD', 'Venda', 'closed', 39, '+39 pips', 'Fevereiro/2021', '2021-02-16', 'Finalizado', 14, true, 'take', 'elite', 14, 1820.42, 1824.29, 1816.52),
  ('AUD/JPY', 'Venda', 'closed', 25, '+25 pips', 'Fevereiro/2021', '2021-02-17', 'Finalizado', 15, true, 'take', 'elite', 15, 82.041, 81.792, 82.309),
  ('CAD/CHF', 'Compra', 'closed', 66, '+66 pips', 'Fevereiro/2021', '2021-02-17', 'Finalizado', 16, true, 'take', 'elite', 16, 0.705, 0.71164, 0.7011),
  ('EUR/NZD', 'Compra', 'closed', -80, '-80 pips', 'Fevereiro/2021', '2021-02-17', 'Finalizado', 17, true, 'stop', 'elite', 17, 1.6798, 1.68462, 1.67182),
  ('EUR/CHF', 'Compra', 'closed', 62, '+62 pips', 'Fevereiro/2021', '2021-02-18', 'Finalizado', 18, true, 'take', 'elite', 18, 1.0829, 1.09748, 1.06951),
  ('EUR/NZD', 'Compra', 'closed', -26, '-26 pips', 'Fevereiro/2021', '2021-02-18', 'Finalizado', 19, true, 'stop', 'elite', 19, 1.6637, 1.66611, 1.66106),
  ('AUD/CHF', 'Venda', 'closed', 30, '+30 pips', 'Fevereiro/2021', '2021-02-22', 'Finalizado', 20, true, 'take', 'elite', 20, 0.70769, 0.7063, 0.70884),
  ('WTI', 'Venda', 'closed', 58, '+58 pips', 'Fevereiro/2021', '2021-02-23', 'Finalizado', 21, true, 'take', 'elite', 21, 0.6197, 0.62551, 0.61365),
  ('XAU/USD', 'Venda', 'closed', 30, '+30 pips', 'Fevereiro/2021', '2021-02-23', 'Finalizado', 22, true, 'take', 'elite', 22, 1800.5, 1810.61, 1789.71),
  ('AUD/CAD', 'Venda', 'closed', -26, '-26 pips', 'Fevereiro/2021', '2021-02-24', 'Finalizado', 23, true, 'stop', 'elite', 23, 0.99521, 0.99127, 0.99783),
  ('EUR/AUD', 'Compra', 'closed', 30, '+30 pips', 'Fevereiro/2021', '2021-02-26', 'Finalizado', 24, true, 'take', 'elite', 24, 1.53406, 1.527, 1.53017),
  ('XAU/USD', 'Venda', 'closed', 48, '+48 pips', 'Fevereiro/2021', '2021-02-26', 'Finalizado', 25, true, 'take', 'elite', 25, 1760.38, 1755.57, 1767.12);
