-- Elite: Outubro/2021 (29 sinais, +161 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2021, 9, 'Outubro', 29, 161, '+161 pips', 'Finalizado', array['GBP/AUD', 'AUD/NZD', 'GBP/CAD', 'XAU/USD', 'AUD/CAD', 'EUR/AUD', 'EUR/USD', 'GBP/USD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Outubro/2021';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('GBP/AUD', 'Compra', 'closed', -26, '-26 pips', 'Outubro/2021', '2021-10-01', 'Finalizado', 1, true, 'stop', 'elite', 1, 1.86705, 1.86884, 1.86449),
  ('AUD/NZD', 'Venda', 'closed', 39, '+39 pips', 'Outubro/2021', '2021-10-04', 'Finalizado', 2, true, 'take', 'elite', 2, 1.04544, 1.04159, 1.05017),
  ('GBP/CAD', 'Venda', 'closed', -46, '-46 pips', 'Outubro/2021', '2021-10-04', 'Finalizado', 3, true, 'stop', 'elite', 3, 1.71461, 1.7185, 1.71),
  ('XAU/USD', 'Venda', 'closed', 31, '+31 pips', 'Outubro/2021', '2021-10-06', 'Finalizado', 4, true, 'take', 'elite', 4, 1761.58, 1758.46, 1765.38),
  ('AUD/CAD', 'Compra', 'closed', 35, '+35 pips', 'Outubro/2021', '2021-10-07', 'Finalizado', 5, true, 'take', 'elite', 5, 0.91822, 0.9246, 0.91673),
  ('XAU/USD', 'Venda', 'closed', 20, '+20 pips', 'Outubro/2021', '2021-10-07', 'Finalizado', 6, true, 'take', 'elite', 6, 1760.41, 1755.09, 1760.41),
  ('EUR/AUD', 'Compra', 'closed', -25, '-25 pips', 'Outubro/2021', '2021-10-07', 'Finalizado', 7, true, 'stop', 'elite', 7, 1.57969, 1.5831, 1.57718),
  ('EUR/USD', 'Venda', 'closed', -20, '-20 pips', 'Outubro/2021', '2021-10-08', 'Finalizado', 8, true, 'stop', 'elite', 8, null, null, null),
  ('GBP/USD', 'Venda', 'closed', -20, '-20 pips', 'Outubro/2021', '2021-10-08', 'Finalizado', 9, true, 'stop', 'elite', 9, null, null, null),
  ('XAU/USD', 'Venda', 'closed', -20, '-20 pips', 'Outubro/2021', '2021-10-08', 'Finalizado', 10, true, 'stop', 'elite', 10, null, null, null),
  ('USD/CHF', 'Compra', 'closed', -20, '-20 pips', 'Outubro/2021', '2021-10-08', 'Finalizado', 11, true, 'stop', 'elite', 11, null, null, null),
  ('USD/JPY', 'Compra', 'closed', -20, '-20 pips', 'Outubro/2021', '2021-10-08', 'Finalizado', 12, true, 'stop', 'elite', 12, null, null, null),
  ('USD/CAD', 'Compra', 'closed', -20, '-20 pips', 'Outubro/2021', '2021-10-08', 'Finalizado', 13, true, 'stop', 'elite', 13, null, null, null),
  ('XAU/USD', 'Compra', 'closed', 70, '+70 pips', 'Outubro/2021', '2021-10-08', 'Finalizado', 14, true, 'take', 'elite', 14, null, null, null),
  ('XAU/USD', 'Compra', 'closed', 50, '+50 pips', 'Outubro/2021', '2021-10-08', 'Finalizado', 15, true, 'take', 'elite', 15, null, null, null),
  ('EUR/USD', 'Compra', 'closed', -64, '-64 pips', 'Outubro/2021', '2021-10-11', 'Finalizado', 16, true, 'stop', 'elite', 16, 1.15762, 1.16347, 1.15119),
  ('XAU/USD', 'Compra', 'closed', 46, '+46 pips', 'Outubro/2021', '2021-10-12', 'Finalizado', 17, true, 'take', 'elite', 17, 1760.94, 1765.58, 1756.63),
  ('XAU/USD', 'Venda', 'closed', 21, '+21 pips', 'Outubro/2021', '2021-10-14', 'Finalizado', 18, true, 'take', 'elite', 18, 1796.19, 1794.12, 1798),
  ('CAD/JPY', 'Venda', 'closed', -30, '-30 pips', 'Outubro/2021', '2021-10-15', 'Finalizado', 19, true, 'stop', 'elite', 19, null, null, null),
  ('CHF/JPY', 'Venda', 'closed', -30, '-30 pips', 'Outubro/2021', '2021-10-15', 'Finalizado', 20, true, 'stop', 'elite', 20, null, null, null),
  ('AUD/JPY', 'Venda', 'closed', 30, '+30 pips', 'Outubro/2021', '2021-10-15', 'Finalizado', 21, true, 'take', 'elite', 21, null, null, null),
  ('XAU/USD', 'Venda', 'closed', 50, '+50 pips', 'Outubro/2021', '2021-10-18', 'Finalizado', 22, true, 'take', 'elite', 22, 1766.92, 1778.25, 1759.25),
  ('WTI', 'Venda', 'closed', 10, '+10 pips', 'Outubro/2021', '2021-10-19', 'Finalizado', 23, true, 'take', 'elite', 23, 0.81866, 0.8155, 0.821),
  ('XAU/USD', 'Compra', 'closed', 30, '+30 pips', 'Outubro/2021', '2021-10-19', 'Finalizado', 24, true, 'take', 'elite', 24, null, null, null),
  ('WTI', 'Venda', 'closed', 39, '+39 pips', 'Outubro/2021', '2021-10-20', 'Finalizado', 25, true, 'take', 'elite', 25, 0.83386, 0.83, 0.83686),
  ('EUR/CAD', 'Compra', 'closed', -29, '-29 pips', 'Outubro/2021', '2021-10-21', 'Finalizado', 26, true, 'stop', 'elite', 26, 1.438, 1.44243, 1.43509),
  ('XAU/USD', 'Venda', 'closed', 35, '+35 pips', 'Outubro/2021', '2021-10-24', 'Finalizado', 27, true, 'take', 'elite', 27, 1806.5, 1801.79, 1810.78),
  ('XAU/USD', 'Venda', 'closed', -33, '-33 pips', 'Outubro/2021', '2021-10-27', 'Finalizado', 28, true, 'stop', 'elite', 28, 1795, 1792.39, 1798.3),
  ('WTI', 'Venda', 'closed', 58, '+58 pips', 'Outubro/2021', '2021-10-29', 'Finalizado', 29, true, 'take', 'elite', 29, 0.81437, 0.80858, 0.81837);
