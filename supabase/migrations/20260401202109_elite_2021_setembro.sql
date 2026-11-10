-- Elite: Setembro/2021 (32 sinais, +567 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2021, 8, 'Setembro', 32, 567, '+567 pips', 'Finalizado', array['CHF/JPY', 'GBP/USD', 'EUR/USD', 'XAU/USD', 'USD/CHF', 'USD/JPY', 'GBP/CAD', 'EUR/AUD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Setembro/2021';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('CHF/JPY', 'Compra', 'closed', 37, '+36.7 pips', 'Setembro/2021', '2021-09-01', 'Finalizado', 1, true, 'take', 'elite', 1, 120.283, 120.65, 119.9),
  ('GBP/USD', 'Compra', 'closed', 30, '+30 pips', 'Setembro/2021', '2021-09-03', 'Finalizado', 2, true, 'take', 'elite', 2, null, null, null),
  ('EUR/USD', 'Compra', 'closed', 20, '+20 pips', 'Setembro/2021', '2021-09-03', 'Finalizado', 3, true, 'take', 'elite', 3, null, null, null),
  ('XAU/USD', 'Compra', 'closed', 30, '+30 pips', 'Setembro/2021', '2021-09-03', 'Finalizado', 4, true, 'take', 'elite', 4, null, null, null),
  ('USD/CHF', 'Venda', 'closed', 25, '+25 pips', 'Setembro/2021', '2021-09-03', 'Finalizado', 5, true, 'take', 'elite', 5, null, null, null),
  ('USD/JPY', 'Venda', 'closed', 35, '+35 pips', 'Setembro/2021', '2021-09-03', 'Finalizado', 6, true, 'take', 'elite', 6, null, null, null),
  ('GBP/CAD', 'Compra', 'closed', 40, '+40 pips', 'Setembro/2021', '2021-09-06', 'Finalizado', 7, true, 'take', 'elite', 7, null, null, null),
  ('EUR/AUD', 'Compra', 'closed', -38, '-38 pips', 'Setembro/2021', '2021-09-06', 'Finalizado', 8, true, 'stop', 'elite', 8, 1.59662, 1.60267, 1.59281),
  ('GBP/CHF', 'Compra', 'closed', 85, '+85 pips', 'Setembro/2021', '2021-09-08', 'Finalizado', 9, true, 'take', 'elite', 9, 1.2681, 1.27663, 1.26191),
  ('XAU/USD', 'Venda', 'closed', 100, '+100 pips', 'Setembro/2021', '2021-09-08', 'Finalizado', 10, true, 'take', 'elite', 10, 1792.85, 1778.44, 1801.39),
  ('EUR/JPY', 'Compra', 'closed', 10, '+10 pips', 'Setembro/2021', '2021-09-09', 'Finalizado', 11, true, 'take', 'elite', 11, 129.744, 129.978, 129.592),
  ('USD/CAD', 'Compra', 'closed', 20, '+20 pips', 'Setembro/2021', '2021-09-10', 'Finalizado', 12, true, 'take', 'elite', 12, 1.26108, 1.26372, 1.25837),
  ('EUR/JPY', 'Compra', 'closed', 13, '+13 pips', 'Setembro/2021', '2021-09-13', 'Finalizado', 13, true, 'take', 'elite', 13, 130.002, 130.212, 129.838),
  ('EUR/GBP', 'Compra', 'closed', -37, '-37 pips', 'Setembro/2021', '2021-09-14', 'Finalizado', 14, true, 'stop', 'elite', 14, 0.85547, 0.85979, 0.85174),
  ('XAU/USD', 'Compra', 'closed', -30, '-30 pips', 'Setembro/2021', '2021-09-15', 'Finalizado', 15, true, 'stop', 'elite', 15, 1794.44, 1797.4, 1794.33),
  ('XAU/USD', 'Compra', 'closed', 30, '+30 pips', 'Setembro/2021', '2021-09-15', 'Finalizado', 16, true, 'take', 'elite', 16, 1794.44, 1797.4, 1794.33),
  ('EUR/AUD', 'Compra', 'closed', -37, '-37 pips', 'Setembro/2021', '2021-09-16', 'Finalizado', 17, true, 'stop', 'elite', 17, 1.61477, 1.61654, 1.61111),
  ('EUR/NZD', 'Compra', 'closed', 54, '+54 pips', 'Setembro/2021', '2021-09-16', 'Finalizado', 18, true, 'take', 'elite', 18, 1.66526, 1.66508, 1.65989),
  ('EUR/NZD', 'Compra', 'closed', 35, '+35 pips', 'Setembro/2021', '2021-09-20', 'Finalizado', 19, true, 'take', 'elite', 19, 1.66786, 1.68129, 1.66059),
  ('XAU/USD', 'Compra', 'closed', 50, '+50 pips', 'Setembro/2021', '2021-09-20', 'Finalizado', 20, true, 'take', 'elite', 20, 1760.58, 1770.16, 1753.66),
  ('EUR/GBP', 'Compra', 'closed', 51, '+51 pips', 'Setembro/2021', '2021-09-21', 'Finalizado', 21, true, 'take', 'elite', 21, 0.85894, 0.86408, 0.85236),
  ('EUR/CAD', 'Compra', 'closed', -40, '-40 pips', 'Setembro/2021', '2021-09-21', 'Finalizado', 22, true, 'stop', 'elite', 22, 1.50392, 1.51631, 1.49482),
  ('EUR/AUD', 'Compra', 'closed', -45, '-45 pips', 'Setembro/2021', '2021-09-21', 'Finalizado', 23, true, 'stop', 'elite', 23, 1.62243, 1.63731, 1.61489),
  ('USD/CHF', 'Compra', 'closed', 15, '+15 pips', 'Setembro/2021', '2021-09-22', 'Finalizado', 24, true, 'take', 'elite', 24, 0.92315, 0.92463, 0.92154),
  ('XAU/USD', 'Compra', 'closed', 40, '+40 pips', 'Setembro/2021', '2021-09-22', 'Finalizado', 25, true, 'take', 'elite', 25, null, null, null),
  ('XAU/USD', 'Compra', 'closed', 20, '+20 pips', 'Setembro/2021', '2021-09-23', 'Finalizado', 26, true, 'take', 'elite', 26, null, null, null),
  ('GBP/JPY', 'Venda', 'closed', 35, '+35 pips', 'Setembro/2021', '2021-09-23', 'Finalizado', 27, true, 'take', 'elite', 27, 151.356, 151.005, 151.668),
  ('EUR/GBP', 'Compra', 'closed', 41, '+41 pips', 'Setembro/2021', '2021-09-24', 'Finalizado', 28, true, 'take', 'elite', 28, 0.85694, 0.861, 0.85236),
  ('EUR/CHF', 'Compra', 'closed', -45, '-45 pips', 'Setembro/2021', '2021-09-27', 'Finalizado', 29, true, 'stop', 'elite', 29, 1.08529, 1.08951, 1.08076),
  ('EUR/GBP', 'Compra', 'closed', 30, '+30 pips', 'Setembro/2021', '2021-09-27', 'Finalizado', 30, true, 'take', 'elite', 30, null, null, null),
  ('NZD/CAD', 'Compra', 'closed', -25, '-25 pips', 'Setembro/2021', '2021-09-28', 'Finalizado', 31, true, 'stop', 'elite', 31, 0.87634, 0.87951, 0.87383),
  ('NZD/CAD', 'Compra', 'closed', 18, '+18 pips', 'Setembro/2021', '2021-09-30', 'Finalizado', 32, true, 'take', 'elite', 32, null, null, null);
