-- Elite: Fevereiro/2023 (49 sinais, +412 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2023, 1, 'Fevereiro', 49, 412, '+412 pips', 'Finalizado', array['NZD/CHF', 'EUR/JPY', 'WTI', 'USD/CHF', 'XAU/USD', 'EUR/AUD', 'NZD/JPY', 'AUD/USD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Fevereiro/2023';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('NZD/CHF', 'Compra', 'closed', -29, '-29 pips', 'Fevereiro/2023', '2023-02-01', 'Finalizado', 1, true, 'stop', 'elite', 1, 0.59192, 0.5945, 0.589),
  ('EUR/JPY', 'Compra', 'closed', -67, '-67 pips', 'Fevereiro/2023', '2023-02-01', 'Finalizado', 2, true, 'stop', 'elite', 2, 141.667, 142.791, 141.001),
  ('WTI', 'Venda', 'closed', 75, '+75 pips', 'Fevereiro/2023', '2023-02-02', 'Finalizado', 3, true, 'take', 'elite', 3, 0.76213, 0.7202, 0.80243),
  ('USD/CHF', 'Compra', 'closed', 28, '+28 pips', 'Fevereiro/2023', '2023-02-02', 'Finalizado', 4, true, 'take', 'elite', 4, 0.91414, 0.91695, 0.9117),
  ('WTI', 'Compra', 'closed', -88, '-88 pips', 'Fevereiro/2023', '2023-02-03', 'Finalizado', 5, true, 'stop', 'elite', 5, 0.76347, 0.77417, 0.75466),
  ('XAU/USD', 'Compra', 'closed', 124, '+124 pips', 'Fevereiro/2023', '2023-02-03', 'Finalizado', 6, true, 'take', 'elite', 6, 1863.5, 1875.86, 1859.28),
  ('EUR/AUD', 'Venda', 'closed', 37, '+37 pips', 'Fevereiro/2023', '2023-02-06', 'Finalizado', 7, true, 'take', 'elite', 7, 1.55468, 1.551, 1.559),
  ('NZD/JPY', 'Venda', 'closed', 30, '+30 pips', 'Fevereiro/2023', '2023-02-07', 'Finalizado', 8, true, 'take', 'elite', 8, 82.24, 82.42, 83.92),
  ('AUD/USD', 'Venda', 'closed', 5, '+5 pips', 'Fevereiro/2023', '2023-02-07', 'Finalizado', 9, true, 'take', 'elite', 9, 0.6917, 0.69042, 0.69363),
  ('XAU/USD', 'Compra', 'closed', -73, '-73 pips', 'Fevereiro/2023', '2023-02-07', 'Finalizado', 10, true, 'stop', 'elite', 10, 1866.85, 1847.41, 1874.15),
  ('NZD/CAD', 'Venda', 'closed', -25, '-25 pips', 'Fevereiro/2023', '2023-02-07', 'Finalizado', 11, true, 'stop', 'elite', 11, 0.84648, 0.824, 0.849),
  ('CAD/CHF', 'Venda', 'closed', 12, '+12 pips', 'Fevereiro/2023', '2023-02-08', 'Finalizado', 12, true, 'take', 'elite', 12, 0.6865, 0.67922, 0.6905),
  ('XAU/USD', 'Compra', 'closed', 69, '+69 pips', 'Fevereiro/2023', '2023-02-08', 'Finalizado', 13, true, 'take', 'elite', 13, 1879.35, 1886.21, 1870.13),
  ('EUR/JPY', 'Venda', 'closed', 1, '+1 pips', 'Fevereiro/2023', '2023-02-09', 'Finalizado', 14, true, 'take', 'elite', 14, 140.8, 140.4, 141.03),
  ('WTI', 'Venda', 'closed', -39, '-39 pips', 'Fevereiro/2023', '2023-02-09', 'Finalizado', 15, true, 'stop', 'elite', 15, 0.77709, 0.763, 0.781),
  ('GBP/USD', 'Venda', 'closed', 33, '+33 pips', 'Fevereiro/2023', '2023-02-09', 'Finalizado', 16, true, 'take', 'elite', 16, 1.21133, 1.208, 1.214),
  ('XAU/USD', 'Venda', 'closed', 40, '+40 pips', 'Fevereiro/2023', '2023-02-09', 'Finalizado', 17, true, 'take', 'elite', 17, 1861.57, 1846, 1880.9),
  ('GBP/NZD', 'Venda', 'closed', -53, '-53 pips', 'Fevereiro/2023', '2023-02-09', 'Finalizado', 18, true, 'stop', 'elite', 18, 1.91446, 1.9095, 1.91974),
  ('NZD/CAD', 'Venda', 'closed', -46, '-46 pips', 'Fevereiro/2023', '2023-02-10', 'Finalizado', 19, true, 'stop', 'elite', 19, 0.84614, 0.823, 0.85071),
  ('GBP/NZD', 'Venda', 'closed', 71, '+71 pips', 'Fevereiro/2023', '2023-02-12', 'Finalizado', 20, true, 'take', 'elite', 20, 1.90964, 1.90257, 1.9155),
  ('EUR/GBP', 'Compra', 'closed', -23, '-23 pips', 'Fevereiro/2023', '2023-02-12', 'Finalizado', 21, true, 'stop', 'elite', 21, 0.88602, 0.8892, 0.88375),
  ('XAU/USD', 'Venda', 'closed', 77, '+77 pips', 'Fevereiro/2023', '2023-02-12', 'Finalizado', 22, true, 'take', 'elite', 22, 1861.66, 1854, 1866.39),
  ('EUR/AUD', 'Venda', 'closed', -77, '-77 pips', 'Fevereiro/2023', '2023-02-13', 'Finalizado', 23, true, 'stop', 'elite', 23, 1.5401, 1.52854, 1.54778),
  ('USD/CAD', 'Venda', 'closed', -79, '-79 pips', 'Fevereiro/2023', '2023-02-14', 'Finalizado', 24, true, 'stop', 'elite', 24, 1.33158, 1.3259, 1.33952),
  ('NZD/CAD', 'Venda', 'closed', 20, '+20 pips', 'Fevereiro/2023', '2023-02-14', 'Finalizado', 25, true, 'take', 'elite', 25, 0.84436, 0.8325, 0.8495),
  ('EUR/USD', 'Venda', 'closed', 30, '+30 pips', 'Fevereiro/2023', '2023-02-15', 'Finalizado', 26, true, 'take', 'elite', 26, 1.06978, 1.0529, 1.0785),
  ('CAD/CHF', 'Compra', 'closed', -47, '-47 pips', 'Fevereiro/2023', '2023-02-15', 'Finalizado', 27, true, 'stop', 'elite', 27, 0.68967, 0.69375, 0.685),
  ('WTI', 'Venda', 'closed', -43, '-43 pips', 'Fevereiro/2023', '2023-02-16', 'Finalizado', 28, true, 'stop', 'elite', 28, 0.786, 0.778, 0.79031),
  ('USD/CHF', 'Compra', 'closed', 60, '+60 pips', 'Fevereiro/2023', '2023-02-16', 'Finalizado', 29, true, 'take', 'elite', 29, 0.92672, 0.9365, 0.921),
  ('GBP/CAD', 'Venda', 'closed', -20, '-20 pips', 'Fevereiro/2023', '2023-02-16', 'Finalizado', 30, true, 'stop', 'elite', 30, 1.61118, 1.5985, 1.622),
  ('AUD/CAD', 'Compra', 'closed', 16, '+16 pips', 'Fevereiro/2023', '2023-02-17', 'Finalizado', 31, true, 'take', 'elite', 31, 0.92548, 0.93, 0.92),
  ('AUD/JPY', 'Compra', 'closed', 37, '+37 pips', 'Fevereiro/2023', '2023-02-19', 'Finalizado', 32, true, 'take', 'elite', 32, 92.581, 92.95, 92.13),
  ('XAU/USD', 'Compra', 'closed', 70, '+70 pips', 'Fevereiro/2023', '2023-02-20', 'Finalizado', 33, true, 'take', 'elite', 33, 1846, 1853, 1853),
  ('XAU/USD', 'Compra', 'closed', -50, '-50 pips', 'Fevereiro/2023', '2023-02-20', 'Finalizado', 34, true, 'stop', 'elite', 34, 1843, 1853, 1838),
  ('USD/CAD', 'Compra', 'closed', 50, '+50 pips', 'Fevereiro/2023', '2023-02-21', 'Finalizado', 35, true, 'take', 'elite', 35, 1.34776, 1.3535, 1.34347),
  ('EUR/USD', 'Venda', 'closed', 76, '+76 pips', 'Fevereiro/2023', '2023-02-21', 'Finalizado', 36, true, 'take', 'elite', 36, 1.064, 1.05643, 1.06803),
  ('NZD/CAD', 'Compra', 'closed', 20, '+20 pips', 'Fevereiro/2023', '2023-02-21', 'Finalizado', 37, true, 'take', 'elite', 37, 0.842, 0.844, 0.8395),
  ('XAU/USD', 'Venda', 'closed', 75, '+75 pips', 'Fevereiro/2023', '2023-02-22', 'Finalizado', 38, true, 'take', 'elite', 38, 1831, 1823.5, 1836.2),
  ('AUD/USD', 'Compra', 'closed', -30, '-30 pips', 'Fevereiro/2023', '2023-02-22', 'Finalizado', 39, true, 'stop', 'elite', 39, 0.68353, 0.685, 0.6805),
  ('XAU/USD', 'Compra', 'closed', 69, '+69 pips', 'Fevereiro/2023', '2023-02-23', 'Finalizado', 40, true, 'take', 'elite', 40, 1828, 1834.87, 1819.33),
  ('NZD/JPY', 'Compra', 'closed', -39, '-39 pips', 'Fevereiro/2023', '2023-02-23', 'Finalizado', 41, true, 'stop', 'elite', 41, 84.19, 84.55, 83.796),
  ('USD/CAD', 'Compra', 'closed', 70, '+70 pips', 'Fevereiro/2023', '2023-02-23', 'Finalizado', 42, true, 'take', 'elite', 42, 1.355, 1.362, 1.348),
  ('NZD/USD', 'Venda', 'closed', -62, '-62 pips', 'Fevereiro/2023', '2023-02-23', 'Finalizado', 43, true, 'stop', 'elite', 43, 0.62028, 0.612, 0.6265),
  ('EUR/AUD', 'Compra', 'closed', 4, '+4 pips', 'Fevereiro/2023', '2023-02-24', 'Finalizado', 44, true, 'take', 'elite', 44, 1.56583, 1.5826, 1.553),
  ('NZD/CAD', 'Venda', 'closed', 30, '+30 pips', 'Fevereiro/2023', '2023-02-24', 'Finalizado', 45, true, 'take', 'elite', 45, 0.84043, 0.823, 0.847),
  ('GBP/NZD', 'Compra', 'closed', 45, '+45 pips', 'Fevereiro/2023', '2023-04-26', 'Finalizado', 46, true, 'take', 'elite', 46, 1.94, 1.948, 1.934),
  ('EUR/NZD', 'Compra', 'closed', 60, '+60 pips', 'Fevereiro/2023', '2023-04-26', 'Finalizado', 47, true, 'take', 'elite', 47, 1.71258, 1.7295, 1.706),
  ('CAD/JPY', 'Compra', 'closed', -59, '-59 pips', 'Fevereiro/2023', '2023-04-27', 'Finalizado', 48, true, 'stop', 'elite', 48, 100.386, 100.93, 99.8),
  ('EUR/CHF', 'Compra', 'closed', 27, '+27 pips', 'Fevereiro/2023', '2023-04-28', 'Finalizado', 49, true, 'take', 'elite', 49, 0.9965, 0.9992, 0.993);
