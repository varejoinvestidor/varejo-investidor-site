-- Elite: Novembro/2021 (38 sinais, +745 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2021, 10, 'Novembro', 38, 745, '+745 pips', 'Finalizado', array['EUR/USD', 'EUR/CAD', 'CAD/JPY', 'EUR/JPY', 'WTI', 'XAU/USD', 'GBP/CAD', 'EUR/GBP']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Novembro/2021';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('EUR/USD', 'Compra', 'closed', 36, '+36 pips', 'Novembro/2021', '2021-11-01', 'Finalizado', 1, true, 'take', 'elite', 1, null, null, null),
  ('EUR/CAD', 'Compra', 'closed', 35, '+35 pips', 'Novembro/2021', '2021-11-01', 'Finalizado', 2, true, 'take', 'elite', 2, null, null, null),
  ('CAD/JPY', 'Venda', 'closed', 51, '+51 pips', 'Novembro/2021', '2021-11-01', 'Finalizado', 3, true, 'take', 'elite', 3, 91.084, 91.59, 92.516),
  ('EUR/CAD', 'Compra', 'closed', 5, '+5 pips', 'Novembro/2021', '2021-11-02', 'Finalizado', 4, true, 'take', 'elite', 4, 1.42467, 1.44172, 1.43537),
  ('EUR/JPY', 'Venda', 'closed', 25, '+25 pips', 'Novembro/2021', '2021-11-03', 'Finalizado', 5, true, 'take', 'elite', 5, 132.49, 132.243, 132.663),
  ('WTI', 'Compra', 'closed', 42, '+42 pips', 'Novembro/2021', '2021-11-04', 'Finalizado', 6, true, 'take', 'elite', 6, 0.79216, 0.79631, 0.78786),
  ('WTI', 'Venda', 'closed', 72, '+72 pips', 'Novembro/2021', '2021-11-04', 'Finalizado', 7, true, 'take', 'elite', 7, 0.78941, 0.78024, 0.79309),
  ('WTI', 'Venda', 'closed', 30, '+30 pips', 'Novembro/2021', '2021-11-05', 'Finalizado', 8, true, 'take', 'elite', 8, null, null, null),
  ('XAU/USD', 'Venda', 'closed', 44, '+44 pips', 'Novembro/2021', '2021-11-08', 'Finalizado', 9, true, 'take', 'elite', 9, 1824.5, 1820.08, 1827.88),
  ('WTI', 'Venda', 'closed', 54, '+54 pips', 'Novembro/2021', '2021-11-09', 'Finalizado', 10, true, 'take', 'elite', 10, 0.83065, 0.82528, 0.8357),
  ('XAU/USD', 'Venda', 'closed', 20, '+20 pips', 'Novembro/2021', '2021-11-10', 'Finalizado', 11, true, 'take', 'elite', 11, 1847.78, 1845.53, 1851.51),
  ('WTI', 'Venda', 'closed', 10, '+10 pips', 'Novembro/2021', '2021-11-10', 'Finalizado', 12, true, 'take', 'elite', 12, null, null, null),
  ('GBP/CAD', 'Compra', 'closed', 34, '+34 pips', 'Novembro/2021', '2021-11-11', 'Finalizado', 13, true, 'take', 'elite', 13, 1.68226, 1.68568, 1.67946),
  ('XAU/USD', 'Venda', 'closed', 5, '+5 pips', 'Novembro/2021', '2021-11-11', 'Finalizado', 14, true, 'take', 'elite', 14, 1857.95, 1855.1, 1861.67),
  ('EUR/CAD', 'Venda', 'closed', 39, '+39 pips', 'Novembro/2021', '2021-11-15', 'Finalizado', 15, true, 'take', 'elite', 15, 1.43394, 1.43, 1.43756),
  ('EUR/CAD', 'Compra', 'closed', 15, '+15 pips', 'Novembro/2021', '2021-11-15', 'Finalizado', 16, true, 'take', 'elite', 16, 1.42265, 1.4241, 1.4209),
  ('XAU/USD', 'Compra', 'closed', 40, '+40 pips', 'Novembro/2021', '2021-11-16', 'Finalizado', 17, true, 'take', 'elite', 17, null, null, null),
  ('XAU/USD', 'Compra', 'closed', 40, '+40 pips', 'Novembro/2021', '2021-11-16', 'Finalizado', 18, true, 'take', 'elite', 18, null, null, null),
  ('EUR/GBP', 'Compra', 'closed', 6, '+6 pips', 'Novembro/2021', '2021-11-17', 'Finalizado', 19, true, 'take', 'elite', 19, 0.83914, 0.84035, 0.83798),
  ('XAU/USD', 'Venda', 'closed', 28, '+28 pips', 'Novembro/2021', '2021-11-18', 'Finalizado', 20, true, 'take', 'elite', 20, 1866.33, 1863.53, 1871.3),
  ('EUR/GBP', 'Compra', 'closed', 5, '+5 pips', 'Novembro/2021', '2021-11-18', 'Finalizado', 21, true, 'take', 'elite', 21, 0.8402, 0.843, 0.82911),
  ('GBP/CAD', 'Venda', 'closed', -45, '-45 pips', 'Novembro/2021', '2021-11-18', 'Finalizado', 22, true, 'stop', 'elite', 22, 1.70009, 1.69605, 1.70458),
  ('XAU/USD', 'Venda', 'closed', -39, '-39 pips', 'Novembro/2021', '2021-11-19', 'Finalizado', 23, true, 'stop', 'elite', 23, 1859.56, 1853.58, 1863.49),
  ('XAU/USD', 'Venda', 'closed', 40, '+40 pips', 'Novembro/2021', '2021-11-19', 'Finalizado', 24, true, 'take', 'elite', 24, null, null, null),
  ('XAU/USD', 'Venda', 'closed', 37, '+37 pips', 'Novembro/2021', '2021-11-19', 'Finalizado', 25, true, 'take', 'elite', 25, null, null, null),
  ('WTI', 'Compra', 'closed', 27, '+27 pips', 'Novembro/2021', '2021-11-21', 'Finalizado', 26, true, 'take', 'elite', 26, null, null, null),
  ('GBP/CHF', 'Venda', 'closed', -34, '-34 pips', 'Novembro/2021', '2021-11-22', 'Finalizado', 27, true, 'stop', 'elite', 27, 1.24578, 1.24426, 1.24921),
  ('USD/CAD', 'Venda', 'closed', -34, '-34 pips', 'Novembro/2021', '2021-11-22', 'Finalizado', 28, true, 'stop', 'elite', 28, 1.26376, 1.26033, 1.26675),
  ('XAU/USD', 'Compra', 'closed', -30, '-30 pips', 'Novembro/2021', '2021-11-22', 'Finalizado', 29, true, 'stop', 'elite', 29, null, null, null),
  ('XAU/USD', 'Compra', 'closed', -54, '-54 pips', 'Novembro/2021', '2021-11-23', 'Finalizado', 30, true, 'stop', 'elite', 30, 1796.56, 1802.87, 1791.16),
  ('XAU/USD', 'Compra', 'closed', 50, '+50 pips', 'Novembro/2021', '2021-11-23', 'Finalizado', 31, true, 'take', 'elite', 31, null, null, null),
  ('NZD/CAD', 'Compra', 'closed', -20, '-20 pips', 'Novembro/2021', '2021-11-23', 'Finalizado', 32, true, 'stop', 'elite', 32, null, null, null),
  ('XAU/USD', 'Compra', 'closed', 171, '+171 pips', 'Novembro/2021', '2021-11-24', 'Finalizado', 33, true, 'take', 'elite', 33, 1790.27, 1807.4, 1781.48),
  ('CHF/JPY', 'Venda', 'closed', 30, '+30 pips', 'Novembro/2021', '2021-11-25', 'Finalizado', 34, true, 'take', 'elite', 34, 123.009, 122.707, 123.232),
  ('EUR/JPY', 'Venda', 'closed', 73, '+73 pips', 'Novembro/2021', '2021-11-25', 'Finalizado', 35, true, 'take', 'elite', 35, 128.817, 128.089, 129.286),
  ('NZD/JPY', 'Venda', 'closed', -68, '-68 pips', 'Novembro/2021', '2021-11-28', 'Finalizado', 36, true, 'stop', 'elite', 36, 77.595, 78.4, 76.92),
  ('EUR/USD', 'Compra', 'closed', -20, '-20 pips', 'Novembro/2021', '2021-11-30', 'Finalizado', 37, true, 'stop', 'elite', 37, 1.13414, 1.14346, 1.1266),
  ('USD/JPY', 'Compra', 'closed', 25, '+25 pips', 'Novembro/2021', '2021-11-30', 'Finalizado', 38, true, 'take', 'elite', 38, 113.266, 113.517, 112.912);
