-- Elite: Dezembro/2023 (48 sinais, +560 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2023, 11, 'Dezembro', 48, 560, '+560 pips', 'Finalizado', array['XAU/USD', 'GBP/NZD', 'GBP/AUD', 'GBP/CAD', 'WTI', 'GBP/JPY', 'CAD/JPY', 'NZD/JPY']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Dezembro/2023';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('XAU/USD', 'Compra', 'closed', 50, '+50 pips', 'Dezembro/2023', '2023-12-01', 'Finalizado', 1, true, 'take', 'elite', 2951, 2042.52, 2047.5, 2038.2),
  ('XAU/USD', 'Compra', 'closed', -40, '-40 pips', 'Dezembro/2023', '2023-12-04', 'Finalizado', 2, true, 'stop', 'elite', 2952, 2070.02, 2075, 2066),
  ('XAU/USD', 'Compra', 'closed', -35, '-35 pips', 'Dezembro/2023', '2023-12-04', 'Finalizado', 3, true, 'stop', 'elite', 2953, 2052.52, 2063, 2049),
  ('GBP/NZD', 'Compra', 'closed', 30, '+30 pips', 'Dezembro/2023', '2023-12-04', 'Finalizado', 4, true, 'take', 'elite', 2954, 2.051, 2.054, 2.046),
  ('XAU/USD', 'Venda', 'closed', 10, '+10 pips', 'Dezembro/2023', '2023-12-05', 'Finalizado', 5, true, 'take', 'elite', 2955, 2015.64, 1994.8, 2026),
  ('GBP/AUD', 'Venda', 'closed', 11, '+11 pips', 'Dezembro/2023', '2023-12-05', 'Finalizado', 6, true, 'take', 'elite', 2956, 1.91519, 1.9127, 1.9192),
  ('XAU/USD', 'Compra', 'closed', 41, '+41 pips', 'Dezembro/2023', '2023-12-06', 'Finalizado', 7, true, 'take', 'elite', 2957, 2027.88, 2038.5, 2019.3),
  ('GBP/CAD', 'Venda', 'closed', 58, '+58 pips', 'Dezembro/2023', '2023-12-06', 'Finalizado', 8, true, 'take', 'elite', 2958, 1.70794, 1.6945, 1.7145),
  ('WTI', 'Compra', 'closed', 33, '+33 pips', 'Dezembro/2023', '2023-12-06', 'Finalizado', 9, true, 'take', 'elite', 2959, 0.69741, 0.70075, 0.692),
  ('GBP/JPY', 'Compra', 'closed', -53, '-53 pips', 'Dezembro/2023', '2023-12-07', 'Finalizado', 10, true, 'stop', 'elite', 2960, 181.83, 182.4, 181.3),
  ('GBP/JPY', 'Compra', 'closed', -30, '-30 pips', 'Dezembro/2023', '2023-12-07', 'Finalizado', 11, true, 'stop', 'elite', 2961, 181.476, null, null),
  ('CAD/JPY', 'Compra', 'closed', -30, '-30 pips', 'Dezembro/2023', '2023-12-07', 'Finalizado', 12, true, 'stop', 'elite', 2962, 106.004, null, null),
  ('NZD/JPY', 'Compra', 'closed', -30, '-30 pips', 'Dezembro/2023', '2023-12-07', 'Finalizado', 13, true, 'stop', 'elite', 2963, 88.867, null, null),
  ('EUR/JPY', 'Compra', 'closed', -30, '-30 pips', 'Dezembro/2023', '2023-12-07', 'Finalizado', 14, true, 'stop', 'elite', 2964, 155.562, null, null),
  ('USD/JPY', 'Compra', 'closed', -30, '-30 pips', 'Dezembro/2023', '2023-12-07', 'Finalizado', 15, true, 'stop', 'elite', 2965, 144.282, null, null),
  ('XAU/USD', 'Compra', 'closed', -91, '-91 pips', 'Dezembro/2023', '2023-12-07', 'Finalizado', 16, true, 'stop', 'elite', 2966, 2030.64, 2039.3, 2021.5),
  ('EUR/USD', 'Compra', 'closed', -37, '-37 pips', 'Dezembro/2023', '2023-12-07', 'Finalizado', 17, true, 'stop', 'elite', 2967, 1.07967, 1.082, 1.076),
  ('GBP/NZD', 'Compra', 'closed', 28, '+28 pips', 'Dezembro/2023', '2023-12-10', 'Finalizado', 18, true, 'take', 'elite', 2968, 2.04977, 2.0526, 2.045),
  ('EUR/CAD', 'Compra', 'closed', -47, '-47 pips', 'Dezembro/2023', '2023-12-10', 'Finalizado', 19, true, 'stop', 'elite', 2969, 1.46265, 1.4672, 1.458),
  ('AUD/JPY', 'Compra', 'closed', 30, '+30 pips', 'Dezembro/2023', '2023-12-10', 'Finalizado', 20, true, 'take', 'elite', 2970, 95.5, 95.8, 95),
  ('NZD/CHF', 'Venda', 'closed', 40, '+40 pips', 'Dezembro/2023', '2023-12-10', 'Finalizado', 21, true, 'take', 'elite', 2971, 0.5375, 0.533, 0.54125),
  ('XAU/USD', 'Compra', 'closed', 100, '+100 pips', 'Dezembro/2023', '2023-12-11', 'Finalizado', 22, true, 'take', 'elite', 2972, 1978.78, 1988.8, 1976),
  ('GBP/CHF', 'Compra', 'closed', -13, '-13 pips', 'Dezembro/2023', '2023-12-12', 'Finalizado', 23, true, 'stop', 'elite', 2973, 1.10329, 1.105, 1.102),
  ('GBP/AUD', 'Venda', 'closed', -65, '-65 pips', 'Dezembro/2023', '2023-12-12', 'Finalizado', 24, true, 'stop', 'elite', 2974, 1.9095, 1.8975, 1.916),
  ('XAU/USD', 'Compra', 'closed', 15, '+15 pips', 'Dezembro/2023', '2023-12-12', 'Finalizado', 25, true, 'take', 'elite', 2975, 1983.5, 1985, 1981),
  ('XAU/USD', 'Compra', 'closed', -85, '-85 pips', 'Dezembro/2023', '2023-12-12', 'Finalizado', 26, true, 'stop', 'elite', 2976, 1982.51, 1993, 1974),
  ('XAU/USD', 'Compra', 'closed', 230, '+230 pips', 'Dezembro/2023', '2023-12-13', 'Finalizado', 27, true, 'take', 'elite', 2977, 1982.25, 2005.22, null),
  ('USD/JPY', 'Venda', 'closed', 119, '+119 pips', 'Dezembro/2023', '2023-12-13', 'Finalizado', 28, true, 'take', 'elite', 2978, 145.106, 143.921, null),
  ('USD/CAD', 'Venda', 'closed', 46, '+46 pips', 'Dezembro/2023', '2023-12-13', 'Finalizado', 29, true, 'take', 'elite', 2979, 1.35802, 1.35341, null),
  ('GBP/USD', 'Compra', 'closed', 79, '+79 pips', 'Dezembro/2023', '2023-12-13', 'Finalizado', 30, true, 'take', 'elite', 2980, 1.2514, 1.25928, null),
  ('EUR/USD', 'Compra', 'closed', 64, '+64 pips', 'Dezembro/2023', '2023-12-13', 'Finalizado', 31, true, 'take', 'elite', 2981, 1.07861, 1.085, null),
  ('AUD/USD', 'Compra', 'closed', 72, '+72 pips', 'Dezembro/2023', '2023-12-13', 'Finalizado', 32, true, 'take', 'elite', 2982, 0.6573, 0.66448, null),
  ('EUR/NZD', 'Venda', 'closed', 56, '+56 pips', 'Dezembro/2023', '2023-12-13', 'Finalizado', 33, true, 'take', 'elite', 2983, 1.75669, 1.749, 1.764),
  ('XAU/USD', 'Venda', 'closed', -30, '-30 pips', 'Dezembro/2023', '2023-12-14', 'Finalizado', 34, true, 'stop', 'elite', 2984, 2035, 2028, 2038),
  ('XAU/USD', 'Venda', 'closed', -70, '-70 pips', 'Dezembro/2023', '2023-12-14', 'Finalizado', 35, true, 'stop', 'elite', 2985, 2034, 2027, 2041),
  ('CAD/CHF', 'Compra', 'closed', 15, '+15 pips', 'Dezembro/2023', '2023-12-15', 'Finalizado', 36, true, 'take', 'elite', 2986, 0.6496, 0.6515, 0.647),
  ('XAU/USD', 'Compra', 'closed', 35, '+35 pips', 'Dezembro/2023', '2023-12-17', 'Finalizado', 37, true, 'take', 'elite', 2987, 2022, 2025.5, 2016.5),
  ('GBP/CAD', 'Compra', 'closed', 58, '+58 pips', 'Dezembro/2023', '2023-12-17', 'Finalizado', 38, true, 'take', 'elite', 2988, 1.69722, 1.703, 1.689),
  ('EUR/NZD', 'Venda', 'closed', 10, '+10 pips', 'Dezembro/2023', '2023-12-18', 'Finalizado', 39, true, 'take', 'elite', 2989, 1.75506, 1.7541, 1.7575),
  ('XAU/USD', 'Venda', 'closed', -60, '-60 pips', 'Dezembro/2023', '2023-12-18', 'Finalizado', 40, true, 'stop', 'elite', 2990, 2025, 2011, 2031),
  ('EUR/USD', 'Compra', 'closed', 50, '+50 pips', 'Dezembro/2023', '2023-12-19', 'Finalizado', 41, true, 'take', 'elite', 2991, 1.09268, 1.102, 1.08384),
  ('AUD/NZD', 'Compra', 'closed', -24, '-24 pips', 'Dezembro/2023', '2023-12-19', 'Finalizado', 42, true, 'stop', 'elite', 2992, 1.07841, 1.081, 1.076),
  ('USD/CAD', 'Venda', 'closed', 51, '+51 pips', 'Dezembro/2023', '2023-12-20', 'Finalizado', 43, true, 'take', 'elite', 2993, 1.33276, 1.319, 1.339),
  ('NZD/CHF', 'Compra', 'closed', -49, '-49 pips', 'Dezembro/2023', '2023-12-20', 'Finalizado', 44, true, 'stop', 'elite', 2994, 0.5419, 0.5465, 0.537),
  ('CHF/JPY', 'Venda', 'closed', 55, '+55 pips', 'Dezembro/2023', '2023-12-20', 'Finalizado', 45, true, 'take', 'elite', 2995, 166.276, 165.2, 167.1),
  ('EUR/AUD', 'Venda', 'closed', -78, '-78 pips', 'Dezembro/2023', '2023-12-20', 'Finalizado', 46, true, 'stop', 'elite', 2996, 1.61819, 1.59055, 1.626),
  ('GBP/USD', 'Compra', 'closed', 65, '+65 pips', 'Dezembro/2023', '2023-12-21', 'Finalizado', 47, true, 'take', 'elite', 2997, 1.26915, 1.287, 1.2628),
  ('GBP/AUD', 'Venda', 'closed', 36, '+36 pips', 'Dezembro/2023', '2023-12-22', 'Finalizado', 48, true, 'take', 'elite', 2998, 1.86775, 1.8642, 1.872);
