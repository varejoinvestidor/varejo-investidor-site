-- Elite: Dezembro/2020 (12 sinais, +423 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2020, 11, 'Dezembro', 12, 423, '+423 pips', 'Finalizado', array['EUR/CAD', 'GBP/CHF', 'AUD/NZD', 'USD/CAD', 'EUR/NZD', 'EUR/AUD', 'EUR/JPY', 'GBP/AUD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Dezembro/2020';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('EUR/CAD', 'Venda', 'closed', 87, '+87 pips', 'Dezembro/2020', '2020-12-09', 'Finalizado', 1, true, 'take', 'elite', 1, 1.54811, 1.53942, 1.55482),
  ('GBP/CHF', 'Venda', 'closed', 50, '+50 pips', 'Dezembro/2020', '2020-12-14', 'Finalizado', 2, true, 'take', 'elite', 2, 1.18458, 1.16315, 1.20069),
  ('AUD/NZD', 'Compra', 'closed', 68, '+68 pips', 'Dezembro/2020', '2020-12-15', 'Finalizado', 3, true, 'take', 'elite', 3, 1.06552, 1.07229, 1.05552),
  ('USD/CAD', 'Compra', 'closed', 34, '+34 pips', 'Dezembro/2020', '2020-12-16', 'Finalizado', 4, true, 'take', 'elite', 4, 1.27497, 1.27833, 1.27176),
  ('EUR/NZD', 'Compra', 'closed', 30, '+30 pips', 'Dezembro/2020', '2020-12-16', 'Finalizado', 5, true, 'take', 'elite', 5, 1.71835, 1.72713, 1.71123),
  ('EUR/AUD', 'Compra', 'closed', 25, '+25 pips', 'Dezembro/2020', '2020-12-16', 'Finalizado', 6, true, 'take', 'elite', 6, 1.61185, 1.61592, 1.60817),
  ('EUR/JPY', 'Venda', 'closed', -30, '-30 pips', 'Dezembro/2020', '2020-12-17', 'Finalizado', 7, true, 'stop', 'elite', 7, 126.346, 125.757, 126.346),
  ('GBP/AUD', 'Venda', 'closed', 38, '+38 pips', 'Dezembro/2020', '2020-12-17', 'Finalizado', 8, true, 'take', 'elite', 8, 1.78087, 1.77704, 1.78527),
  ('GBP/AUD', 'Venda', 'closed', 57, '+57 pips', 'Dezembro/2020', '2020-12-18', 'Finalizado', 9, true, 'take', 'elite', 9, 1.78687, 1.76746, 1.78687),
  ('EUR/GBP', 'Venda', 'closed', 21, '+21 pips', 'Dezembro/2020', '2020-12-18', 'Finalizado', 10, true, 'take', 'elite', 10, 0.90582, 0.90374, 0.90728),
  ('EUR/CAD', 'Compra', 'closed', 23, '+23 pips', 'Dezembro/2020', '2020-12-07', 'Finalizado', 11, true, 'take', 'elite', 11, 1.55137, 1.55507, 1.54892),
  ('USD/CAD', 'Compra', 'closed', 20, '+20 pips', 'Dezembro/2020', '2020-12-08', 'Finalizado', 12, true, 'take', 'elite', 12, 1.28033, 1.28497, 1.27793);
