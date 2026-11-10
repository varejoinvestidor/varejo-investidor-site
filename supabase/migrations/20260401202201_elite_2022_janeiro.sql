-- Elite: Janeiro/2022 (42 sinais, +463 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2022, 0, 'Janeiro', 42, 463, '+463 pips', 'Finalizado', array['WTI', 'EUR/NZD', 'XAU/USD', 'NZD/JPY', 'USD/JPY', 'NZD/CAD', 'GBP/CAD', 'AUD/USD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Janeiro/2022';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('WTI', 'Venda', 'closed', 50, '+50 pips', 'Janeiro/2022', '2022-01-03', 'Finalizado', 1, true, 'take', 'elite', 1, 0.75222, 0.73546, 0.76256),
  ('EUR/NZD', 'Venda', 'closed', 30, '+30 pips', 'Janeiro/2022', '2022-01-03', 'Finalizado', 2, true, 'take', 'elite', 2, 1.66349, 1.6603, 1.66746),
  ('XAU/USD', 'Venda', 'closed', 43, '+43 pips', 'Janeiro/2022', '2022-01-04', 'Finalizado', 3, true, 'take', 'elite', 3, 1813.33, 1809.02, 1816.26),
  ('WTI', 'Venda', 'closed', -98, '-98 pips', 'Janeiro/2022', '2022-01-04', 'Finalizado', 4, true, 'stop', 'elite', 4, 0.76695, 0.75377, 0.77676),
  ('NZD/JPY', 'Venda', 'closed', 43, '+43 pips', 'Janeiro/2022', '2022-01-05', 'Finalizado', 5, true, 'take', 'elite', 5, 78.728, 78.035, 79.21),
  ('WTI', 'Venda', 'closed', -98, '-98 pips', 'Janeiro/2022', '2022-01-05', 'Finalizado', 6, true, 'stop', 'elite', 6, 0.76695, 0.75377, 0.77676),
  ('EUR/NZD', 'Compra', 'closed', 50, '+50 pips', 'Janeiro/2022', '2022-01-05', 'Finalizado', 7, true, 'take', 'elite', 7, 1.66928, 1.68003, 1.65878),
  ('XAU/USD', 'Compra', 'closed', 39, '+39 pips', 'Janeiro/2022', '2022-01-06', 'Finalizado', 8, true, 'take', 'elite', 8, 1791.16, 1795.04, 1788.26),
  ('USD/JPY', 'Venda', 'closed', 15, '+15 pips', 'Janeiro/2022', '2022-01-07', 'Finalizado', 9, true, 'take', 'elite', 9, null, null, null),
  ('NZD/CAD', 'Venda', 'closed', 10, '+10 pips', 'Janeiro/2022', '2022-01-07', 'Finalizado', 10, true, 'take', 'elite', 10, null, null, null),
  ('GBP/CAD', 'Venda', 'closed', 2, '+2 pips', 'Janeiro/2022', '2022-01-07', 'Finalizado', 11, true, 'take', 'elite', 11, null, null, null),
  ('XAU/USD', 'Venda', 'closed', -32, '-32 pips', 'Janeiro/2022', '2022-01-07', 'Finalizado', 12, true, 'stop', 'elite', 12, 1790.66, 1784.14, 1793.83),
  ('AUD/USD', 'Venda', 'closed', -40, '-40 pips', 'Janeiro/2022', '2022-01-10', 'Finalizado', 13, true, 'stop', 'elite', 13, 0.71632, 0.69963, 0.73039),
  ('XAU/USD', 'Venda', 'closed', 20, '+20 pips', 'Janeiro/2022', '2022-01-11', 'Finalizado', 14, true, 'take', 'elite', 14, 1818.85, 1812.89, 1823.58),
  ('XAU/USD', 'Venda', 'closed', -22, '-22 pips', 'Janeiro/2022', '2022-01-12', 'Finalizado', 15, true, 'stop', 'elite', 15, 1805.58, 1801.8, 1807.82),
  ('GBP/AUD', 'Venda', 'closed', 70, '+70 pips', 'Janeiro/2022', '2022-01-12', 'Finalizado', 16, true, 'take', 'elite', 16, 1.8894, 1.87825, 1.8987),
  ('XAU/USD', 'Venda', 'closed', 45, '+45 pips', 'Janeiro/2022', '2022-01-12', 'Finalizado', 17, true, 'take', 'elite', 17, 1824.78, 1820.27, 1828.44),
  ('AUD/JPY', 'Venda', 'closed', 29, '+29 pips', 'Janeiro/2022', '2022-01-13', 'Finalizado', 18, true, 'take', 'elite', 18, 83.453, 83.065, 83.635),
  ('WTI', 'Venda', 'closed', 40, '+40 pips', 'Janeiro/2022', '2022-01-13', 'Finalizado', 19, true, 'take', 'elite', 19, 0.81765, 0.81225, 0.82493),
  ('AUD/USD', 'Compra', 'closed', 12, '+12 pips', 'Janeiro/2022', '2022-01-14', 'Finalizado', 20, true, 'take', 'elite', 20, 0.72396, 0.72511, 0.72264),
  ('XAU/USD', 'Venda', 'closed', 40, '+40 pips', 'Janeiro/2022', '2022-01-14', 'Finalizado', 21, true, 'take', 'elite', 21, 1821.75, 1814.97, 1827.28),
  ('EUR/AUD', 'Compra', 'closed', 30, '+30 pips', 'Janeiro/2022', '2022-01-15', 'Finalizado', 22, true, 'take', 'elite', 22, 1.58263, 1.58729, 1.57611),
  ('EUR/USD', 'Compra', 'closed', -78, '-78 pips', 'Janeiro/2022', '2022-01-16', 'Finalizado', 23, true, 'stop', 'elite', 23, 1.14169, 1.15316, 1.13391),
  ('XAU/USD', 'Compra', 'closed', 28, '+28 pips', 'Janeiro/2022', '2022-01-16', 'Finalizado', 24, true, 'take', 'elite', 24, 1818.61, 1821.44, 1814),
  ('WTI', 'Venda', 'closed', 40, '+40 pips', 'Janeiro/2022', '2022-01-17', 'Finalizado', 25, true, 'take', 'elite', 25, 0.83058, 0.81995, 0.83719),
  ('GBP/CAD', 'Venda', 'closed', 20, '+20 pips', 'Janeiro/2022', '2022-01-17', 'Finalizado', 26, true, 'take', 'elite', 26, 1.70594, 1.70008, 1.71405),
  ('NZD/JPY', 'Venda', 'closed', 79, '+79 pips', 'Janeiro/2022', '2022-01-18', 'Finalizado', 27, true, 'take', 'elite', 27, 77.509, 76.716, 78.238),
  ('GBP/USD', 'Compra', 'closed', 23, '+23 pips', 'Janeiro/2022', '2022-01-18', 'Finalizado', 28, true, 'take', 'elite', 28, 1.3602, 1.36247, 1.35787),
  ('XAU/USD', 'Compra', 'closed', 10, '+10 pips', 'Janeiro/2022', '2022-01-19', 'Finalizado', 29, true, 'take', 'elite', 29, 1839.48, 1831.74, 1843.13),
  ('USD/JPY', 'Venda', 'closed', 40, '+40 pips', 'Janeiro/2022', '2022-01-20', 'Finalizado', 30, true, 'take', 'elite', 30, 114.162, 113.634, 114.474),
  ('GBP/CHF', 'Venda', 'closed', 63, '+63 pips', 'Janeiro/2022', '2021-01-20', 'Finalizado', 31, true, 'take', 'elite', 31, 1.24503, 1.23874, 1.24836),
  ('EUR/USD', 'Compra', 'closed', 30, '+30 pips', 'Janeiro/2022', '2021-01-20', 'Finalizado', 32, true, 'take', 'elite', 32, 1.13183, 1.13513, 1.12925),
  ('EUR/CHF', 'Compra', 'closed', -31, '-31 pips', 'Janeiro/2022', '2021-01-23', 'Finalizado', 33, true, 'stop', 'elite', 33, 1.03525, 1.03818, 1.03211),
  ('GBP/CHF', 'Compra', 'closed', -48, '-48 pips', 'Janeiro/2022', '2022-01-23', 'Finalizado', 34, true, 'stop', 'elite', 34, 1.2389, 1.24365, 1.23011),
  ('XAU/USD', 'Compra', 'closed', 40, '+40 pips', 'Janeiro/2022', '2022-01-23', 'Finalizado', 35, true, 'take', 'elite', 35, 1836.72, 1840.68, 1835.16),
  ('WTI', 'Venda', 'closed', 45, '+45 pips', 'Janeiro/2022', '2022-01-24', 'Finalizado', 36, true, 'take', 'elite', 36, 0.83277, 0.82495, 0.84561),
  ('GBP/JPY', 'Venda', 'closed', -52, '-52 pips', 'Janeiro/2022', '2022-01-25', 'Finalizado', 37, true, 'stop', 'elite', 37, 153.301, 152.509, 153.82),
  ('XAU/USD', 'Compra', 'closed', 30, '+30 pips', 'Janeiro/2022', '2022-01-26', 'Finalizado', 38, true, 'take', 'elite', 38, 1820.25, 1825.85, 1815.7),
  ('CHF/JPY', 'Compra', 'closed', 10, '+10 pips', 'Janeiro/2022', '2022-01-27', 'Finalizado', 39, true, 'take', 'elite', 39, 123.975, 124.5, 123.469),
  ('EUR/CAD', 'Venda', 'closed', -18, '-18 pips', 'Janeiro/2022', '2022-01-27', 'Finalizado', 40, true, 'stop', 'elite', 40, 1.41901, 1.41676, 1.42079),
  ('CAD/JPY', 'Venda', 'closed', -76, '-76 pips', 'Janeiro/2022', '2022-01-28', 'Finalizado', 41, true, 'stop', 'elite', 41, 90.174, 89.181, 90.938),
  ('AUD/USD', 'Venda', 'closed', 30, '+30 pips', 'Janeiro/2022', '2022-01-31', 'Finalizado', 42, true, 'take', 'elite', 42, 0.70617, 0.69913, 0.70861);
