-- Elite: Novembro/2023 (39 sinais, +435 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2023, 10, 'Novembro', 39, 435, '+435 pips', 'Finalizado', array['GBP/JPY', 'GBP/AUD', 'XAU/USD', 'USD/CAD', 'GBP/CHF', 'EUR/NZD', 'CAD/JPY', 'EUR/USD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Novembro/2023';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('GBP/JPY', 'Venda', 'closed', -40, '-40 pips', 'Novembro/2023', '2023-10-01', 'Finalizado', 1, true, 'stop', 'elite', 2912, 183.3, 182.6, 183.7),
  ('GBP/AUD', 'Venda', 'closed', -109, '-109 pips', 'Novembro/2023', '2023-10-01', 'Finalizado', 2, true, 'stop', 'elite', 2913, 1.89506, 1.886, 1.906),
  ('XAU/USD', 'Compra', 'closed', 35, '+35 pips', 'Novembro/2023', '2023-10-03', 'Finalizado', 3, true, 'take', 'elite', 2914, 1991, 1994.5, 1989),
  ('USD/CAD', 'Compra', 'closed', 33, '+33 pips', 'Novembro/2023', '2023-10-06', 'Finalizado', 4, true, 'take', 'elite', 2915, 1.3698, 1.37314, 1.366),
  ('XAU/USD', 'Compra', 'closed', -21, '-21 pips', 'Novembro/2023', '2023-10-07', 'Finalizado', 5, true, 'stop', 'elite', 2916, 1969.61, 1972.2, 1967.5),
  ('GBP/CHF', 'Venda', 'closed', 31, '+31 pips', 'Novembro/2023', '2023-10-07', 'Finalizado', 6, true, 'take', 'elite', 2917, 1.10632, 1.1032, 1.1105),
  ('GBP/JPY', 'Compra', 'closed', 10, '+10 pips', 'Novembro/2023', '2023-10-08', 'Finalizado', 7, true, 'take', 'elite', 2918, 184.8, 185.245, 186.38),
  ('EUR/NZD', 'Compra', 'closed', 90, '+90 pips', 'Novembro/2023', '2023-10-09', 'Finalizado', 8, true, 'take', 'elite', 2919, 1.81175, 1.82442, 1.80123),
  ('CAD/JPY', 'Compra', 'closed', 10, '+10 pips', 'Novembro/2023', '2023-10-09', 'Finalizado', 9, true, 'take', 'elite', 2920, 109.622, 110.05, 109.2),
  ('EUR/USD', 'Venda', 'closed', -25, '-25 pips', 'Novembro/2023', '2023-10-10', 'Finalizado', 10, true, 'stop', 'elite', 2921, 1.0665, 1.064, 1.069),
  ('GBP/USD', 'Compra', 'closed', 25, '+25 pips', 'Novembro/2023', '2023-10-13', 'Finalizado', 11, true, 'take', 'elite', 2922, 1.2275, 1.23, 1.225),
  ('EUR/AUD', 'Venda', 'closed', -64, '-64 pips', 'Novembro/2023', '2023-10-13', 'Finalizado', 12, true, 'stop', 'elite', 2923, 1.6765, 1.6705, 1.68292),
  ('AUD/CHF', 'Compra', 'closed', -27, '-27 pips', 'Novembro/2023', '2023-10-13', 'Finalizado', 13, true, 'stop', 'elite', 2924, 0.57571, 0.578, 0.573),
  ('XAU/USD', 'Venda', 'closed', 47, '+47 pips', 'Novembro/2023', '2023-10-14', 'Finalizado', 14, true, 'take', 'elite', 2925, 1969, 1964.32, 1972),
  ('XAU/USD', 'Compra', 'closed', 34, '+34 pips', 'Novembro/2023', '2023-10-14', 'Finalizado', 15, true, 'take', 'elite', 2926, 1963.64, 1967, 1959.45),
  ('EUR/AUD', 'Compra', 'closed', 25, '+25 pips', 'Novembro/2023', '2023-10-15', 'Finalizado', 16, true, 'take', 'elite', 2927, 1.667, 1.6695, 1.664),
  ('GBP/AUD', 'Compra', 'closed', -92, '-92 pips', 'Novembro/2023', '2023-10-16', 'Finalizado', 17, true, 'stop', 'elite', 2928, 1.91921, 1.931, 1.91),
  ('XAU/USD', 'Compra', 'closed', 31, '+31 pips', 'Novembro/2023', '2023-10-16', 'Finalizado', 18, true, 'take', 'elite', 2929, 1981.89, 1985, 1977.8),
  ('GBP/CAD', 'Compra', 'closed', 51, '+51 pips', 'Novembro/2023', '2023-10-16', 'Finalizado', 19, true, 'take', 'elite', 2930, 1.70786, 1.713, 1.702),
  ('XAU/USD', 'Venda', 'closed', -28, '-28 pips', 'Novembro/2023', '2023-10-17', 'Finalizado', 20, true, 'stop', 'elite', 2931, 1979.82, 1978.2, 1982.66),
  ('GBP/USD', 'Compra', 'closed', 30, '+30 pips', 'Novembro/2023', '2023-10-19', 'Finalizado', 21, true, 'take', 'elite', 2932, 1.24663, 1.257, 1.236),
  ('XAU/USD', 'Compra', 'closed', 70, '+70 pips', 'Novembro/2023', '2023-10-19', 'Finalizado', 22, true, 'take', 'elite', 2933, 1983.05, 2016.24, 1958.91),
  ('EUR/USD', 'Compra', 'closed', -78, '-78 pips', 'Novembro/2023', '2023-10-20', 'Finalizado', 23, true, 'stop', 'elite', 2934, 1.09475, 1.101, 1.087),
  ('NZD/JPY', 'Compra', 'closed', -20, '-20 pips', 'Novembro/2023', '2023-10-21', 'Finalizado', 24, true, 'stop', 'elite', 2935, 89.8, 90.05, 89.6),
  ('USD/JPY', 'Venda', 'closed', 20, '+20 pips', 'Novembro/2023', '2023-11-22', 'Finalizado', 25, true, 'take', 'elite', 2936, 149.35, 149, 149.7),
  ('XAU/USD', 'Compra', 'closed', 20, '+20 pips', 'Novembro/2023', '2023-11-22', 'Finalizado', 26, true, 'take', 'elite', 2937, 1991.74, 1996.7, 1985.5),
  ('EUR/JPY', 'Compra', 'closed', -35, '-35 pips', 'Novembro/2023', '2023-11-23', 'Finalizado', 27, true, 'stop', 'elite', 2938, 163.146, 163.53, 162.8),
  ('XAU/USD', 'Venda', 'closed', -105, '-105 pips', 'Novembro/2023', '2023-11-23', 'Finalizado', 28, true, 'stop', 'elite', 2939, 1992, 2002.66, 1981.53),
  ('GBP/USD', 'Compra', 'closed', 35, '+35 pips', 'Novembro/2023', '2023-11-24', 'Finalizado', 29, true, 'take', 'elite', 2940, 1.2535, 1.257, 1.25),
  ('GBP/NZD', 'Venda', 'closed', 69, '+69 pips', 'Novembro/2023', '2023-11-27', 'Finalizado', 30, true, 'take', 'elite', 2941, 2.07077, 2.045, 2.0801),
  ('XAU/USD', 'Compra', 'closed', 183, '+183 pips', 'Novembro/2023', '2023-11-28', 'Finalizado', 31, true, 'take', 'elite', 2942, 2016.67, 2035, 2000),
  ('XAU/USD', 'Compra', 'closed', -24, '-24 pips', 'Novembro/2023', '2023-11-29', 'Finalizado', 32, true, 'stop', 'elite', 2943, 2045.17, 2048.5, 2042.76),
  ('GBP/CHF', 'Venda', 'closed', 47, '+47 pips', 'Novembro/2023', '2023-11-29', 'Finalizado', 33, true, 'take', 'elite', 2944, 1.1082, 1.1005, 1.116),
  ('CHF/JPY', 'Venda', 'closed', 120, '+120 pips', 'Novembro/2023', '2023-11-29', 'Finalizado', 34, true, 'take', 'elite', 2945, 168.465, 170.4, 167.25),
  ('EUR/CAD', 'Compra', 'closed', -38, '-38 pips', 'Novembro/2023', '2023-11-29', 'Finalizado', 35, true, 'stop', 'elite', 2946, 1.49177, 1.494, 1.488),
  ('USD/JPY', 'Venda', 'closed', 36, '+36 pips', 'Novembro/2023', '2023-11-30', 'Finalizado', 36, true, 'take', 'elite', 2947, 148.055, 147.7, 148.39),
  ('EUR/USD', 'Compra', 'closed', 5, '+5 pips', 'Novembro/2023', '2023-11-30', 'Finalizado', 37, true, 'take', 'elite', 2948, 1.08936, 1.099, 1.08516),
  ('EUR/GBP', 'Compra', 'closed', 24, '+24 pips', 'Novembro/2023', '2023-11-30', 'Finalizado', 38, true, 'take', 'elite', 2949, 0.86241, 0.8639, 0.86),
  ('XAU/USD', 'Compra', 'closed', 60, '+60 pips', 'Novembro/2023', '2023-11-30', 'Finalizado', 39, true, 'take', 'elite', 2950, 2041.54, 2047.5, 2037.5);
