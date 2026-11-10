-- Elite: Outubro/2023 (26 sinais, -277 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2023, 9, 'Outubro', 26, -277, '-277 pips', 'Finalizado', array['EUR/AUD', 'USD/CAD', 'GBP/JPY', 'GBP/CAD', 'XAU/USD', 'GBP/CHF', 'GBP/NZD', 'GBP/USD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Outubro/2023';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('EUR/AUD', 'Venda', 'closed', -100, '-100 pips', 'Outubro/2023', '2023-10-01', 'Finalizado', 1, true, 'stop', 'elite', 2886, 1.641, 1.63, 1.651),
  ('USD/CAD', 'Compra', 'closed', 120, '+120 pips', 'Outubro/2023', '2023-10-01', 'Finalizado', 2, true, 'take', 'elite', 2887, 1.35796, 1.38, 1.342),
  ('GBP/JPY', 'Venda', 'closed', 1, '+1 pips', 'Outubro/2023', '2023-10-02', 'Finalizado', 3, true, 'take', 'elite', 2888, 181.084, 178.4, 182.5),
  ('GBP/CAD', 'Compra', 'closed', 123, '+123 pips', 'Outubro/2023', '2023-10-03', 'Finalizado', 4, true, 'take', 'elite', 2889, 1.65672, 1.669, 1.645),
  ('XAU/USD', 'Compra', 'closed', -37, '-37 pips', 'Outubro/2023', '2023-10-03', 'Finalizado', 5, true, 'stop', 'elite', 2890, 1830.27, 1842.1, 1826.61),
  ('GBP/CHF', 'Venda', 'closed', 30, '+30 pips', 'Outubro/2023', '2023-10-04', 'Finalizado', 6, true, 'take', 'elite', 2891, 1.11166, 1.106, 1.1148),
  ('GBP/NZD', 'Venda', 'closed', 40, '+40 pips', 'Outubro/2023', '2023-10-04', 'Finalizado', 7, true, 'take', 'elite', 2892, 2.0475, 2.0435, 2.051),
  ('GBP/USD', 'Venda', 'closed', -25, '-25 pips', 'Outubro/2023', '2023-10-05', 'Finalizado', 8, true, 'stop', 'elite', 2893, 1.2178, 1.2159, 1.2203),
  ('WTI', 'Venda', 'closed', -133, '-133 pips', 'Outubro/2023', '2023-10-06', 'Finalizado', 9, true, 'stop', 'elite', 2894, 0.80868, 0.791, 0.822),
  ('XAU/USD', 'Compra', 'closed', -32, '-32 pips', 'Outubro/2023', '2023-10-09', 'Finalizado', 10, true, 'stop', 'elite', 2895, 1864.23, 1872.4, 1861),
  ('XAU/USD', 'Compra', 'closed', 122, '+122 pips', 'Outubro/2023', '2023-10-10', 'Finalizado', 11, true, 'take', 'elite', 2896, 1860.23, 1872.4, 1854),
  ('USD/JPY', 'Compra', 'closed', 40, '+40 pips', 'Outubro/2023', '2023-10-11', 'Finalizado', 12, true, 'take', 'elite', 2897, 149.15, 149.55, 148.65),
  ('USD/CAD', 'Venda', 'closed', -23, '-23 pips', 'Outubro/2023', '2023-10-11', 'Finalizado', 13, true, 'stop', 'elite', 2898, 1.35866, 1.354, 1.361),
  ('XAU/USD', 'Compra', 'closed', 150, '+150 pips', 'Outubro/2023', '2023-10-13', 'Finalizado', 14, true, 'take', 'elite', 2899, 1911.42, 1926.37, 1908),
  ('XAU/USD', 'Venda', 'closed', -109, '-109 pips', 'Outubro/2023', '2023-10-16', 'Finalizado', 15, true, 'stop', 'elite', 2900, 1915.94, 1905.7, 1926.87),
  ('GBP/JPY', 'Venda', 'closed', 28, '+28 pips', 'Outubro/2023', '2023-10-16', 'Finalizado', 16, true, 'take', 'elite', 2901, 182.477, 182.2, 182.8),
  ('WTI', 'Venda', 'closed', -80, '-80 pips', 'Outubro/2023', '2023-10-17', 'Finalizado', 17, true, 'stop', 'elite', 2902, 0.851, 0.842, 0.859),
  ('GBP/USD', 'Venda', 'closed', -79, '-79 pips', 'Outubro/2023', '2023-10-17', 'Finalizado', 18, true, 'stop', 'elite', 2903, 1.21613, 1.208, 1.224),
  ('XAU/USD', 'Venda', 'closed', -34, '-34 pips', 'Outubro/2023', '2023-10-18', 'Finalizado', 19, true, 'stop', 'elite', 2904, 1957.63, null, 1961),
  ('GBP/JPY', 'Venda', 'closed', -96, '-96 pips', 'Outubro/2023', '2023-10-18', 'Finalizado', 20, true, 'stop', 'elite', 2905, 181.741, 180.95, 182.7),
  ('EUR/BP', 'Compra', 'closed', 15, '+15 pips', 'Outubro/2023', '2023-10-18', 'Finalizado', 21, true, 'take', 'elite', 2906, 0.868, 0.86947, 0.8665),
  ('XAU/USD', 'Venda', 'closed', -63, '-63 pips', 'Outubro/2023', '2023-10-19', 'Finalizado', 22, true, 'stop', 'elite', 2907, 1974, 1964.45, 1980.26),
  ('XAU/USD', 'Venda', 'closed', -73, '-73 pips', 'Outubro/2023', '2023-10-19', 'Finalizado', 23, true, 'stop', 'elite', 2908, 1973, 1964.45, 1980.26),
  ('NZD/JPY', 'Compra', 'closed', -69, '-69 pips', 'Outubro/2023', '2023-10-23', 'Finalizado', 24, true, 'stop', 'elite', 2909, 87.607, 88.2, 86.92),
  ('GBP/USD', 'Compra', 'closed', -70, '-70 pips', 'Outubro/2023', '2023-10-23', 'Finalizado', 25, true, 'stop', 'elite', 2910, 1.226, 1.231, 1.219),
  ('USD/CAD', 'Compra', 'closed', 77, '+77 pips', 'Outubro/2023', '2023-10-24', 'Finalizado', 26, true, 'take', 'elite', 2911, 1.37435, 1.382, 1.3663);
