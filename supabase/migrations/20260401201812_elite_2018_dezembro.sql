-- Elite: Dezembro/2018 (46 sinais, +2.370 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2018, 11, 'Dezembro', 46, 2370, '+2.370 pips', 'Finalizado', array['EUR/CAD', 'USD/CAD', 'NZD/USD', 'XAU/USD', 'GBP/JPY', 'CAD/JPY', 'EUR/AUD', 'EUR/NZD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Dezembro/2018';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('EUR/CAD', 'Compra', 'closed', 76, '+76 pips', 'Dezembro/2018', '2018-12-03', 'Finalizado', 1, true, 'take', 'elite', 1, 1.49744, 1.505, 1.493),
  ('USD/CAD', 'Compra', 'closed', 77, '+77 pips', 'Dezembro/2018', '2108-12-03', 'Finalizado', 2, true, 'take', 'elite', 2, 1.31772, 1.3254, 1.31434),
  ('NZD/USD', 'Venda', 'closed', 76, '+76 pips', 'Dezembro/2018', '2018-12-04', 'Finalizado', 3, true, 'take', 'elite', 3, 0.6956, 0.688, 0.701),
  ('XAU/USD', 'Venda', 'closed', -36, '-36 pips', 'Dezembro/2018', '2018-12-04', 'Finalizado', 4, true, 'stop', 'elite', 4, 1239.4, 1229, 1243),
  ('GBP/JPY', 'Compra', 'closed', 30, '+30 pips', 'Dezembro/2018', '2018-12-05', 'Finalizado', 5, true, 'take', 'elite', 5, 143.8, 145.03, 143.39),
  ('CAD/JPY', 'Compra', 'closed', -60, '-60 pips', 'Dezembro/2018', '2018-12-05', 'Finalizado', 6, true, 'stop', 'elite', 6, 85.1, 85.8, 84.5),
  ('EUR/AUD', 'Venda', 'closed', -39, '-39 pips', 'Dezembro/2018', '2018-12-06', 'Finalizado', 7, true, 'stop', 'elite', 7, 1.57111, 1.564, 1.575),
  ('EUR/NZD', 'Venda', 'closed', -60, '-60 pips', 'Dezembro/2018', '2018-12-07', 'Finalizado', 8, true, 'stop', 'elite', 8, 1.652, 1.644, 1.658),
  ('GBP/USD', 'Compra', 'closed', -63, '-63 pips', 'Dezembro/2018', '2018-12-10', 'Finalizado', 9, true, 'stop', 'elite', 9, 1.26629, 1.273, 1.26),
  ('EUR/CHF', 'Venda', 'closed', 30, '+30 pips', 'Dezembro/2018', '2018-12-10', 'Finalizado', 10, true, 'take', 'elite', 10, 1.1295, 1.09839, 1.1399),
  ('XAU/USD', 'Compra', 'closed', -60, '-60 pips', 'Dezembro/2018', '2018-12-11', 'Finalizado', 11, true, 'stop', 'elite', 11, 1248, 1256, 1242),
  ('CHF/JPY', 'Compra', 'closed', -174, '-174 pips', 'Dezembro/2018', '2018-12-11', 'Finalizado', 12, true, 'stop', 'elite', 12, 114.44, 118.469, 112.7),
  ('EUR/AUD', 'Compra', 'closed', 73, '+73 pips', 'Dezembro/2018', '2018-12-12', 'Finalizado', 13, true, 'take', 'elite', 13, 1.5727, 1.58, 1.5675),
  ('GBP/NZD', 'Compra', 'closed', 80, '+80 pips', 'Dezembro/2018', '2018-12-13', 'Finalizado', 14, true, 'take', 'elite', 14, 1.843, 1.851, 1.838),
  ('GBP/CAD', 'Venda', 'closed', 145, '+144.6 pips', 'Dezembro/2018', '2018-12-07', 'Finalizado', 15, true, 'take', 'elite', 15, 1.71088, null, null),
  ('USD/CAD', 'Venda', 'closed', 101, '+101.2 pips', 'Dezembro/2018', '2018-12-07', 'Finalizado', 16, true, 'take', 'elite', 16, 1.33934, null, null),
  ('EUR/CAD', 'Venda', 'closed', 125, '+125.3 pips', 'Dezembro/2018', '2018-12-07', 'Finalizado', 17, true, 'take', 'elite', 17, 1.52329, null, null),
  ('CAD/JPY', 'Compra', 'closed', 69, '+68.5 pips', 'Dezembro/2018', '2018-12-07', 'Finalizado', 18, true, 'take', 'elite', 18, 84.243, null, null),
  ('CAD/CHF', 'Compra', 'closed', 60, '+59.9 pips', 'Dezembro/2018', '2018-12-07', 'Finalizado', 19, true, 'take', 'elite', 19, 0.74119, null, null),
  ('AUD/CAD', 'Venda', 'closed', 49, '+49 pips', 'Dezembro/2018', '2018-12-07', 'Finalizado', 20, true, 'take', 'elite', 20, 0.96578, null, null),
  ('NZD/CAD', 'Venda', 'closed', 48, '+48.3 pips', 'Dezembro/2018', '2018-12-07', 'Finalizado', 21, true, 'take', 'elite', 21, 0.91986, null, null),
  ('GBP/CAD', 'Compra', 'closed', -20, '-20 pips', 'Dezembro/2018', '2108-12-03', 'Finalizado', 22, true, 'stop', 'elite', 22, null, null, null),
  ('GBP/CHF', 'Compra', 'closed', -20, '-20 pips', 'Dezembro/2018', '2108-12-03', 'Finalizado', 23, true, 'stop', 'elite', 23, null, null, null),
  ('GBP/JPY', 'Compra', 'closed', -20, '-20 pips', 'Dezembro/2018', '2108-12-03', 'Finalizado', 24, true, 'stop', 'elite', 24, null, null, null),
  ('GBP/USD', 'Compra', 'closed', -20, '-20 pips', 'Dezembro/2018', '2108-12-03', 'Finalizado', 25, true, 'stop', 'elite', 25, null, null, null),
  ('GBP/AUD', 'Compra', 'closed', -20, '-20 pips', 'Dezembro/2018', '2108-12-03', 'Finalizado', 26, true, 'stop', 'elite', 26, null, null, null),
  ('EUR/GBP', 'Venda', 'closed', -20, '-20 pips', 'Dezembro/2018', '2108-12-03', 'Finalizado', 27, true, 'stop', 'elite', 27, null, null, null),
  ('GBP/NZD', 'Compra', 'closed', -20, '-20 pips', 'Dezembro/2018', '2108-12-03', 'Finalizado', 28, true, 'stop', 'elite', 28, null, null, null),
  ('NZD/USD', 'Compra', 'closed', 80, '+80 pips', 'Dezembro/2018', '2018-12-14', 'Finalizado', 29, true, 'take', 'elite', 29, 0.679, 0.687, 0.674),
  ('GBP/JPY', 'Compra', 'closed', -54, '-54 pips', 'Dezembro/2018', '2018-12-17', 'Finalizado', 30, true, 'stop', 'elite', 30, 142.837, 143.6, 142.3),
  ('GBP/USD', 'Venda', 'closed', 84, '+84 pips', 'Dezembro/2018', '2018-12-18', 'Finalizado', 31, true, 'take', 'elite', 31, 1.2694, 1.261, 1.275),
  ('GBP/CHF', 'Compra', 'closed', -35, '-35 pips', 'Dezembro/2018', '2108-12-18', 'Finalizado', 32, true, 'stop', 'elite', 32, 1.255, 1.263, 1.2515),
  ('GBP/NZD', 'Compra', 'closed', 113, '+113 pips', 'Dezembro/2018', '2018-12-18', 'Finalizado', 33, true, 'take', 'elite', 33, 1.847, 1.8583, 1.837),
  ('GBP/CAD', 'Venda', 'closed', -47, '-47 pips', 'Dezembro/2018', '2018-12-20', 'Finalizado', 34, true, 'stop', 'elite', 34, 1.7093, 1.7, 1.714),
  ('EUR/USD', 'Venda', 'closed', 74, '+74 pips', 'Dezembro/2018', '2018-12-20', 'Finalizado', 35, true, 'take', 'elite', 35, 1.1474, 1.14, 1.1527),
  ('EUR/NZD', 'Venda', 'closed', -33, '-33 pips', 'Dezembro/2018', '2018-12-20', 'Finalizado', 36, true, 'stop', 'elite', 36, 1.6907, 1.68, 1.694),
  ('GBP/USD', 'Venda', 'closed', 70, '+70 pips', 'Dezembro/2018', '2018-12-20', 'Finalizado', 37, true, 'take', 'elite', 37, 1.27, 1.263, 1.275),
  ('GBP/NZD', 'Venda', 'closed', 74, '+74 pips', 'Dezembro/2018', '2018-12-21', 'Finalizado', 38, true, 'take', 'elite', 38, 1.8814, 1.874, 1.887),
  ('EUR/AUD', 'Venda', 'closed', 75, '+75 pips', 'Dezembro/2018', '2018-12-21', 'Finalizado', 39, true, 'take', 'elite', 39, 1.6125, 1.605, 1.619),
  ('AUD/JPY', 'Venda', 'closed', 301, '+301.3 pips', 'Dezembro/2018', '2018-12-18', 'Finalizado', 40, true, 'take', 'elite', 40, 80.676, null, null),
  ('NZD/JPY', 'Venda', 'closed', 298, '+298.3 pips', 'Dezembro/2018', '2018-12-18', 'Finalizado', 41, true, 'take', 'elite', 41, 77.002, null, null),
  ('CAD/JPY', 'Venda', 'closed', 246, '+245.5 pips', 'Dezembro/2018', '2018-12-18', 'Finalizado', 42, true, 'take', 'elite', 42, 83.356, null, null),
  ('USD/JPY', 'Venda', 'closed', 221, '+220.6 pips', 'Dezembro/2018', '2018-12-18', 'Finalizado', 43, true, 'take', 'elite', 43, 112.474, null, null),
  ('GBP/JPY', 'Venda', 'closed', 218, '+217.7 pips', 'Dezembro/2018', '2018-12-18', 'Finalizado', 44, true, 'take', 'elite', 44, 142.237, null, null),
  ('EUR/JPY', 'Venda', 'closed', 160, '+159.9 pips', 'Dezembro/2018', '2018-12-18', 'Finalizado', 45, true, 'take', 'elite', 45, 127.815, null, null),
  ('CHF/JPY', 'Venda', 'closed', 119, '+118.9 pips', 'Dezembro/2018', '2018-12-18', 'Finalizado', 46, true, 'take', 'elite', 46, 113.348, null, null);
