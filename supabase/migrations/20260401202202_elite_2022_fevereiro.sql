-- Elite: Fevereiro/2022 (41 sinais, +357 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2022, 1, 'Fevereiro', 41, 357, '+357 pips', 'Finalizado', array['GBP/CHF', 'XAU/USD', 'GBP/JPY', 'USD/CAD', 'CAD/JPY', 'WTI', 'CAD/CHF', 'EUR/AUD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Fevereiro/2022';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('GBP/CHF', 'Venda', 'closed', -43, '-43 pips', 'Fevereiro/2022', '2022-02-01', 'Finalizado', 1, true, 'stop', 'elite', 1, 1.24515, 1.237, 1.2494),
  ('XAU/USD', 'Compra', 'closed', 31, '+31 pips', 'Fevereiro/2022', '2022-02-02', 'Finalizado', 2, true, 'take', 'elite', 2, 1803.56, 1806.63, 1799.28),
  ('GBP/JPY', 'Venda', 'closed', -51, '-51 pips', 'Fevereiro/2022', '2022-02-02', 'Finalizado', 3, true, 'stop', 'elite', 3, 154.906, 154.163, 155.414),
  ('USD/CAD', 'Compra', 'closed', 47, '+47 pips', 'Fevereiro/2022', '2022-02-04', 'Finalizado', 4, true, 'take', 'elite', 4, null, null, null),
  ('CAD/JPY', 'Venda', 'closed', -20, '-20 pips', 'Fevereiro/2022', '2022-02-04', 'Finalizado', 5, true, 'stop', 'elite', 5, null, null, null),
  ('WTI', 'Venda', 'closed', -20, '-20 pips', 'Fevereiro/2022', '2022-02-04', 'Finalizado', 6, true, 'stop', 'elite', 6, null, null, null),
  ('CAD/CHF', 'Venda', 'closed', -20, '-20 pips', 'Fevereiro/2022', '2022-02-04', 'Finalizado', 7, true, 'stop', 'elite', 7, null, null, null),
  ('EUR/AUD', 'Compra', 'closed', 35, '+35 pips', 'Fevereiro/2022', '2022-02-09', 'Finalizado', 8, true, 'take', 'elite', 8, 1.59338, 1.59689, 1.58918),
  ('EUR/GBP', 'Venda', 'closed', 30, '+30 pips', 'Fevereiro/2022', '2022-02-10', 'Finalizado', 9, true, 'take', 'elite', 9, 0.84228, 0.83882, 0.84494),
  ('XAU/USD', 'Venda', 'closed', -34, '-34 pips', 'Fevereiro/2022', '2022-02-10', 'Finalizado', 10, true, 'stop', 'elite', 10, null, null, null),
  ('EUR/AUD', 'Venda', 'closed', -15, '-15 pips', 'Fevereiro/2022', '2022-02-10', 'Finalizado', 11, true, 'stop', 'elite', 11, null, null, null),
  ('XAU/USD', 'Venda', 'closed', -34, '-34 pips', 'Fevereiro/2022', '2022-02-10', 'Finalizado', 12, true, 'stop', 'elite', 12, null, null, null),
  ('CAD/CHF', 'Compra', 'closed', -25, '-25 pips', 'Fevereiro/2022', '2022-02-11', 'Finalizado', 13, true, 'stop', 'elite', 13, 0.72936, 0.73205, 0.72689),
  ('EUR/AUD', 'Compra', 'closed', 40, '+40 pips', 'Fevereiro/2022', '2022-02-13', 'Finalizado', 14, true, 'take', 'elite', 14, 1.59273, 1.59697, 1.58869),
  ('USD/CHF', 'Compra', 'closed', 70, '+70 pips', 'Fevereiro/2022', '2022-02-13', 'Finalizado', 15, true, 'take', 'elite', 15, 0.92512, 0.93211, 0.92002),
  ('XAU/USD', 'Compra', 'closed', 30, '+30 pips', 'Fevereiro/2022', '2022-02-15', 'Finalizado', 16, true, 'take', 'elite', 16, 1852.81, 1857.67, 1849.35),
  ('GBP/NZD', 'Venda', 'closed', 64, '+64 pips', 'Fevereiro/2022', '2022-02-16', 'Finalizado', 17, true, 'take', 'elite', 17, 2.03825, 2.02569, 2.04142),
  ('EUR/NZD', 'Compra', 'closed', -26, '-26 pips', 'Fevereiro/2022', '2022-02-17', 'Finalizado', 18, true, 'stop', 'elite', 18, 1.69469, null, 1.69213),
  ('EUR/CAD', 'Compra', 'closed', -28, '-28 pips', 'Fevereiro/2022', '2022-02-17', 'Finalizado', 19, true, 'stop', 'elite', 19, 1.44462, 1.44759, 1.4418),
  ('EUR/AUD', 'Compra', 'closed', -54, '-54 pips', 'Fevereiro/2022', '2022-02-20', 'Finalizado', 20, true, 'stop', 'elite', 20, 1.57707, 1.58272, 1.57164),
  ('GBP/USD', 'Compra', 'closed', -138, '-138 pips', 'Fevereiro/2022', '2022-02-20', 'Finalizado', 21, true, 'stop', 'elite', 21, 1.36145, 1.37, 1.34769),
  ('USD/CAD', 'Compra', 'closed', 115, '+114.6 pips', 'Fevereiro/2022', '2022-02-21', 'Finalizado', 22, true, 'take', 'elite', 22, 1.27614, 1.2876, 1.26522),
  ('EUR/NZD', 'Compra', 'closed', 20, '+20 pips', 'Fevereiro/2022', '2022-02-23', 'Finalizado', 23, true, 'take', 'elite', 23, 1.67264, 1.67655, 1.66547),
  ('EUR/GBP', 'Venda', 'closed', -35, '-35 pips', 'Fevereiro/2022', '2022-02-24', 'Finalizado', 24, true, 'stop', 'elite', 24, null, null, null),
  ('XAU/USD', 'Venda', 'closed', 56, '+56 pips', 'Fevereiro/2022', '2022-02-24', 'Finalizado', 25, true, 'take', 'elite', 25, 1947.41, 1941.82, null),
  ('WTI', 'Venda', 'closed', 40, '+40 pips', 'Fevereiro/2022', '2022-02-24', 'Finalizado', 26, true, 'take', 'elite', 26, null, null, null),
  ('XAU/USD', 'Compra', 'closed', 70, '+70 pips', 'Fevereiro/2022', '2022-02-24', 'Finalizado', 27, true, 'take', 'elite', 27, null, null, null),
  ('XAU/USD', 'Compra', 'closed', 30, '+30 pips', 'Fevereiro/2022', '2022-02-24', 'Finalizado', 28, true, 'take', 'elite', 28, null, null, null),
  ('WTI', 'Compra', 'closed', 55, '+55 pips', 'Fevereiro/2022', '2022-02-24', 'Finalizado', 29, true, 'take', 'elite', 29, null, null, null),
  ('XAU/USD', 'Compra', 'closed', 30, '+30 pips', 'Fevereiro/2022', '2022-02-24', 'Finalizado', 30, true, 'take', 'elite', 30, null, null, null),
  ('XAU/USD', 'Compra', 'closed', -30, '-30 pips', 'Fevereiro/2022', '2022-02-24', 'Finalizado', 31, true, 'stop', 'elite', 31, null, null, null),
  ('USD/JPY', 'Venda', 'closed', 17, '+17 pips', 'Fevereiro/2022', '2022-02-24', 'Finalizado', 32, true, 'take', 'elite', 32, 115.357, 115.192, 115.609),
  ('GBP/JPY', 'Venda', 'closed', -44, '-44 pips', 'Fevereiro/2022', '2022-02-24', 'Finalizado', 33, true, 'stop', 'elite', 33, 154.447, 153.643, 154.885),
  ('WTI', 'Venda', 'closed', 92, '+92 pips', 'Fevereiro/2022', '2022-02-25', 'Finalizado', 34, true, 'take', 'elite', 34, 0.9242, 0.91505, 0.93472),
  ('XAU/USD', 'Compra', 'closed', 40, '+40 pips', 'Fevereiro/2022', '2022-02-25', 'Finalizado', 35, true, 'take', 'elite', 35, 1888, 1896, 1882.23),
  ('GBP/NZD', 'Compra', 'closed', -44, '-44 pips', 'Fevereiro/2022', '2022-02-27', 'Finalizado', 36, true, 'stop', 'elite', 36, 2.00008, 2.00795, 1.99571),
  ('EUR/GBP', 'Compra', 'closed', -11, '-11 pips', 'Fevereiro/2022', '2022-02-27', 'Finalizado', 37, true, 'stop', 'elite', 37, 0.83583, 0.83696, 0.83475),
  ('WTI', 'Venda', 'closed', -55, '-55 pips', 'Fevereiro/2022', '2022-02-28', 'Finalizado', 38, true, 'stop', 'elite', 38, 0.94614, 0.93919, 0.95166),
  ('WTI', 'Compra', 'closed', 50, '+50 pips', 'Fevereiro/2022', '2022-02-28', 'Finalizado', 39, true, 'take', 'elite', 39, 0.95462, 0.96333, 0.94738),
  ('XAU/USD', 'Compra', 'closed', 38, '+38 pips', 'Fevereiro/2022', '2022-02-28', 'Finalizado', 40, true, 'take', 'elite', 40, null, null, null),
  ('WTI', 'Compra', 'closed', 84, '+84 pips', 'Fevereiro/2022', '2022-02-28', 'Finalizado', 41, true, 'take', 'elite', 41, 0.95611, 0.96451, 0.94472);
