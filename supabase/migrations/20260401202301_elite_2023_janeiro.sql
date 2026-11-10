-- Elite: Janeiro/2023 (38 sinais, +251 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2023, 0, 'Janeiro', 38, 251, '+251 pips', 'Finalizado', array['EUR/CAD', 'GBP/AUD', 'EUR/AUD', 'GBP/NZD', 'GBP/CAD', 'NZD/USD', 'XAU/USD', 'WTI']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Janeiro/2023';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('EUR/CAD', 'Venda', 'closed', 56, '+56 pips', 'Janeiro/2023', '2022-12-27', 'Finalizado', 1, true, 'take', 'elite', 1, 1.4426, 1.437, 1.448),
  ('GBP/AUD', 'Venda', 'closed', 193, '+193 pips', 'Janeiro/2023', '2023-01-02', 'Finalizado', 2, true, 'take', 'elite', 2, 1.769, 1.7462, 1.786),
  ('EUR/AUD', 'Venda', 'closed', 60, '+60 pips', 'Janeiro/2023', '2023-01-03', 'Finalizado', 3, true, 'take', 'elite', 3, 1.56651, 1.5562, 1.575),
  ('GBP/NZD', 'Venda', 'closed', -120, '-120 pips', 'Janeiro/2023', '2023-01-04', 'Finalizado', 4, true, 'stop', 'elite', 4, 1.904, 1.877, 1.916),
  ('GBP/CAD', 'Venda', 'closed', 20, '+20 pips', 'Janeiro/2023', '2023-01-04', 'Finalizado', 5, true, 'take', 'elite', 5, 1.62842, 1.60803, 1.63604),
  ('NZD/USD', 'Compra', 'closed', -37, '-37 pips', 'Janeiro/2023', '2023-01-05', 'Finalizado', 6, true, 'stop', 'elite', 6, 0.63024, 0.63335, 0.62652),
  ('GBP/NZD', 'Venda', 'closed', -47, '-47 pips', 'Janeiro/2023', '2023-01-05', 'Finalizado', 7, true, 'stop', 'elite', 7, 1.91029, 1.907, 1.915),
  ('XAU/USD', 'Venda', 'closed', 70, '+70 pips', 'Janeiro/2023', '2023-01-06', 'Finalizado', 8, true, 'take', 'elite', 8, null, null, null),
  ('GBP/AUD', 'Venda', 'closed', -55, '-55 pips', 'Janeiro/2023', '2023-01-06', 'Finalizado', 9, true, 'stop', 'elite', 9, 1.75694, 1.75202, 1.7624),
  ('GBP/CAD', 'Venda', 'closed', 0, '+0 pips', 'Janeiro/2023', '2023-01-06', 'Finalizado', 10, true, 'manual', 'elite', 10, null, null, null),
  ('WTI', 'Compra', 'closed', 60, '+60 pips', 'Janeiro/2023', '2023-01-06', 'Finalizado', 11, true, 'take', 'elite', 11, null, null, null),
  ('EUR/CHF', 'Compra', 'closed', 50, '+50 pips', 'Janeiro/2023', '2023-01-09', 'Finalizado', 12, true, 'take', 'elite', 12, 0.9889, 0.99393, 0.983),
  ('USD/JPY', 'Venda', 'closed', -51, '-51 pips', 'Janeiro/2023', '2023-01-09', 'Finalizado', 13, true, 'stop', 'elite', 13, 131.685, 131.25, 132.19),
  ('GBP/CAD', 'Compra', 'closed', -82, '-82 pips', 'Janeiro/2023', '2023-01-09', 'Finalizado', 14, true, 'stop', 'elite', 14, 1.63216, 1.64479, 1.624),
  ('WTI', 'Venda', 'closed', -79, '-79 pips', 'Janeiro/2023', '2023-01-10', 'Finalizado', 15, true, 'stop', 'elite', 15, 0.74747, 0.72, 0.75535),
  ('NZD/JPY', 'Compra', 'closed', 22, '+22 pips', 'Janeiro/2023', '2023-01-12', 'Finalizado', 16, true, 'take', 'elite', 16, 82.981, 83.2, 82.65),
  ('EUR/JPY', 'Compra', 'closed', 35, '+35 pips', 'Janeiro/2023', '2023-01-12', 'Finalizado', 17, true, 'take', 'elite', 17, 140.3, 140.65, 139.91),
  ('AUD/NZD', 'Compra', 'closed', 40, '+40 pips', 'Janeiro/2023', '2023-01-13', 'Finalizado', 18, true, 'take', 'elite', 18, 1.092, 1.096, 1.089),
  ('GBP/NZD', 'Venda', 'closed', 10, '+10 pips', 'Janeiro/2023', '2023-01-16', 'Finalizado', 19, true, 'take', 'elite', 19, 1.90621, 1.8931, 1.914),
  ('EUR/GBP', 'Compra', 'closed', -50, '-50 pips', 'Janeiro/2023', '2023-01-16', 'Finalizado', 20, true, 'stop', 'elite', 20, 0.8876, 0.89244, 0.88263),
  ('EUR/NZD', 'Venda', 'closed', 45, '+45 pips', 'Janeiro/2023', '2023-01-17', 'Finalizado', 21, true, 'take', 'elite', 21, 1.69048, 1.686, 1.698),
  ('EUR/CHF', 'Compra', 'closed', -15, '-15 pips', 'Janeiro/2023', '2023-01-17', 'Finalizado', 22, true, 'stop', 'elite', 22, 0.995, 0.997, 0.9935),
  ('GBP/JPY', 'Compra', 'closed', 31, '+31 pips', 'Janeiro/2023', '2023-01-18', 'Finalizado', 23, true, 'take', 'elite', 23, 158.712, 159.022, null),
  ('USD/JPY', 'Compra', 'closed', 34, '+34 pips', 'Janeiro/2023', '2023-01-18', 'Finalizado', 24, true, 'take', 'elite', 24, 127.954, 128.289, null),
  ('CAD/JPY', 'Compra', 'closed', 82, '+82 pips', 'Janeiro/2023', '2023-01-18', 'Finalizado', 25, true, 'take', 'elite', 25, 95.589, 96.413, null),
  ('AUD/JPY', 'Compra', 'closed', 26, '+26 pips', 'Janeiro/2023', '2023-01-18', 'Finalizado', 26, true, 'take', 'elite', 26, 89.662, 89.923, null),
  ('USD/CHF', 'Venda', 'closed', -22, '-22 pips', 'Janeiro/2023', '2023-01-19', 'Finalizado', 27, true, 'stop', 'elite', 27, 0.91588, 0.91323, 0.91807),
  ('GBP/CHF', 'Compra', 'closed', 18, '+18 pips', 'Janeiro/2023', '2023-01-20', 'Finalizado', 28, true, 'take', 'elite', 28, 1.14, 1.14924, 1.12893),
  ('AUD/USD', 'Compra', 'closed', 32, '+32 pips', 'Janeiro/2023', '2023-01-20', 'Finalizado', 29, true, 'take', 'elite', 29, 0.69317, 0.69642, 0.69),
  ('AUD/CAD', 'Compra', 'closed', 24, '+24 pips', 'Janeiro/2023', '2023-01-22', 'Finalizado', 30, true, 'take', 'elite', 30, 0.93358, 0.936, 0.929),
  ('USD/JPY', 'Compra', 'closed', 64, '+64 pips', 'Janeiro/2023', '2023-01-23', 'Finalizado', 31, true, 'take', 'elite', 31, 130.365, 131, 129.7),
  ('NZD/USD', 'Compra', 'closed', 13, '+13 pips', 'Janeiro/2023', '2023-01-24', 'Finalizado', 32, true, 'take', 'elite', 32, 0.64871, 0.653, 0.646),
  ('XAU/USD', 'Compra', 'closed', -20, '-20 pips', 'Janeiro/2023', '2023-01-24', 'Finalizado', 33, true, 'stop', 'elite', 33, 1938, 1940.24, 1936),
  ('XAU/USD', 'Compra', 'closed', -88, '-88 pips', 'Janeiro/2023', '2023-01-25', 'Finalizado', 34, true, 'stop', 'elite', 34, 1948, 1956, 1939.16),
  ('USD/JPY', 'Venda', 'closed', -105, '-105 pips', 'Janeiro/2023', '2023-01-25', 'Finalizado', 35, true, 'stop', 'elite', 35, 129.212, 127.743, 130.257),
  ('GBP/AUD', 'Venda', 'closed', 44, '+44 pips', 'Janeiro/2023', '2023-01-27', 'Finalizado', 36, true, 'take', 'elite', 36, 1.73942, 1.735, 1.74445),
  ('GBP/CAD', 'Compra', 'closed', 70, '+70 pips', 'Janeiro/2023', '2023-01-30', 'Finalizado', 37, true, 'take', 'elite', 37, 1.65463, 1.667, 1.64483),
  ('CHF/JPY', 'Venda', 'closed', -77, '-77 pips', 'Janeiro/2023', '2023-01-30', 'Finalizado', 38, true, 'stop', 'elite', 38, 140.756, 140.015, 141.521);
