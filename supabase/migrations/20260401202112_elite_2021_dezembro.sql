-- Elite: Dezembro/2021 (16 sinais, -148 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2021, 11, 'Dezembro', 16, -148, '-148 pips', 'Finalizado', array['GBP/CAD', 'WTI', 'XAU/USD', 'EUR/USD', 'EUR/CAD', 'GBP/USD', 'GBP/CHF', 'EUR/NZD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Dezembro/2021';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('GBP/CAD', 'Compra', 'closed', 50, '+50 pips', 'Dezembro/2021', '2021-12-01', 'Finalizado', 1, true, 'take', 'elite', 1, 1.70292, 1.71484, 1.69254),
  ('WTI', 'Venda', 'closed', -79, '-79 pips', 'Dezembro/2021', '2021-12-02', 'Finalizado', 2, true, 'stop', 'elite', 2, 0.65671, 0.64898, 0.66461),
  ('XAU/USD', 'Compra', 'closed', 39, '+39 pips', 'Dezembro/2021', '2021-12-03', 'Finalizado', 3, true, 'take', 'elite', 3, 1780, 1788, 1795),
  ('XAU/USD', 'Venda', 'closed', -54, '-54 pips', 'Dezembro/2021', '2021-12-05', 'Finalizado', 4, true, 'stop', 'elite', 4, 1782.64, 1777.28, 1786.14),
  ('EUR/USD', 'Venda', 'closed', 11, '+11 pips', 'Dezembro/2021', '2021-12-05', 'Finalizado', 5, true, 'take', 'elite', 5, 1.13021, 1.12813, 1.13172),
  ('EUR/CAD', 'Venda', 'closed', 12, '+12 pips', 'Dezembro/2021', '2021-12-06', 'Finalizado', 6, true, 'take', 'elite', 6, 1.43891, 1.43616, 1.44111),
  ('WTI', 'Venda', 'closed', -73, '-73 pips', 'Dezembro/2021', '2021-12-06', 'Finalizado', 7, true, 'stop', 'elite', 7, 0.69929, 0.68979, 0.70662),
  ('WTI', 'Venda', 'closed', -43, '-43 pips', 'Dezembro/2021', '2021-12-07', 'Finalizado', 8, true, 'stop', 'elite', 8, 0.71652, 0.7072, 0.72083),
  ('GBP/USD', 'Venda', 'closed', -22, '-22 pips', 'Dezembro/2021', '2021-12-09', 'Finalizado', 9, true, 'stop', 'elite', 9, 1.31968, 1.31661, 1.32183),
  ('WTI', 'Compra', 'closed', 61, '+61 pips', 'Dezembro/2021', '2021-12-10', 'Finalizado', 10, true, 'take', 'elite', 10, 0.70963, 0.71574, 0.70393),
  ('XAU/USD', 'Compra', 'closed', 20, '+20 pips', 'Dezembro/2021', '2021-12-10', 'Finalizado', 11, true, 'take', 'elite', 11, 1783.07, 1788.74, 1778.1),
  ('GBP/CHF', 'Compra', 'closed', 20, '+20 pips', 'Dezembro/2021', '2021-12-12', 'Finalizado', 12, true, 'take', 'elite', 12, 1.22232, 1.2264, 1.21915),
  ('GBP/CAD', 'Venda', 'closed', -51, '-51 pips', 'Dezembro/2021', '2021-12-12', 'Finalizado', 13, true, 'stop', 'elite', 13, 1.68492, 1.67929, 1.69004),
  ('XAU/USD', 'Compra', 'closed', -40, '-40 pips', 'Dezembro/2021', '2021-12-13', 'Finalizado', 14, true, 'stop', 'elite', 14, null, null, null),
  ('EUR/NZD', 'Compra', 'closed', 30, '+30 pips', 'Dezembro/2021', '2021-12-14', 'Finalizado', 15, true, 'take', 'elite', 15, 1.67234, 1.69975, 1.65081),
  ('USD/CAD', 'Compra', 'closed', -29, '-29 pips', 'Dezembro/2021', '2021-12-15', 'Finalizado', 16, true, 'stop', 'elite', 16, 1.28565, 1.28776, 1.2828);
