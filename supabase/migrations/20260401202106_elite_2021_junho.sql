-- Elite: Junho/2021 (32 sinais, +817 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2021, 5, 'Junho', 32, 817, '+817 pips', 'Finalizado', array['USD/CAD', 'EUR/CAD', 'NZD/JPY', 'EUR/CHF', 'CAD/JPY', 'AUD/USD', 'CHF/JPY', 'XAU/USD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Junho/2021';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('USD/CAD', 'Compra', 'closed', 21, '+21 pips', 'Junho/2021', '2021-06-01', 'Finalizado', 1, true, 'take', 'elite', 1, 1.20525, 1.20736, 1.2027),
  ('EUR/CAD', 'Compra', 'closed', -31, '-31 pips', 'Junho/2021', '2021-06-01', 'Finalizado', 2, true, 'stop', 'elite', 2, 1.47527, 1.47877, 1.4722),
  ('NZD/JPY', 'Venda', 'closed', 10, '+10 pips', 'Junho/2021', '2021-06-02', 'Finalizado', 3, true, 'take', 'elite', 3, 79.342, 78.915, 79.708),
  ('EUR/CHF', 'Venda', 'closed', 15, '+15 pips', 'Junho/2021', '2021-06-03', 'Finalizado', 4, true, 'take', 'elite', 4, 1.09592, 1.0928, 1.098),
  ('USD/CAD', 'Compra', 'closed', 40, '+40 pips', 'Junho/2021', '2021-06-03', 'Finalizado', 5, true, 'take', 'elite', 5, 1.2077, 1.21312, 1.201),
  ('EUR/CAD', 'Compra', 'closed', 21, '+21 pips', 'Junho/2021', '2021-06-04', 'Finalizado', 6, true, 'take', 'elite', 6, null, null, null),
  ('CAD/JPY', 'Venda', 'closed', 35, '+35 pips', 'Junho/2021', '2021-06-04', 'Finalizado', 7, true, 'take', 'elite', 7, null, null, null),
  ('AUD/USD', 'Compra', 'closed', -19, '-19 pips', 'Junho/2021', '2021-06-07', 'Finalizado', 8, true, 'stop', 'elite', 8, 0.7544, 0.7839, 0.7715),
  ('CAD/JPY', 'Venda', 'closed', 37, '+37 pips', 'Junho/2021', '2021-06-07', 'Finalizado', 9, true, 'take', 'elite', 9, 90.495, 89.25, 90.987),
  ('CHF/JPY', 'Venda', 'closed', -40, '-40 pips', 'Junho/2021', '2021-06-07', 'Finalizado', 10, true, 'stop', 'elite', 10, 121.555, 121.975, 122.589),
  ('USD/CAD', 'Compra', 'closed', 57, '+57 pips', 'Junho/2021', '2021-06-08', 'Finalizado', 11, true, 'take', 'elite', 11, 1.20867, 1.21432, 1.2045),
  ('XAU/USD', 'Compra', 'closed', 51, '+51 pips', 'Junho/2021', '2021-06-08', 'Finalizado', 12, true, 'take', 'elite', 12, 1894.73, 1899.83, 1892.19),
  ('EUR/CAD', 'Compra', 'closed', 31, '+31 pips', 'Junho/2021', '2021-06-08', 'Finalizado', 13, true, 'take', 'elite', 13, 1.476, 1.4791, 1.46999),
  ('NZD/USD', 'Venda', 'closed', 41, '+41 pips', 'Junho/2021', '2021-06-10', 'Finalizado', 14, true, 'take', 'elite', 14, 0.71826, 0.71415, 0.72151),
  ('EUR/CAD', 'Compra', 'closed', 40, '+40 pips', 'Junho/2021', '2021-06-14', 'Finalizado', 15, true, 'take', 'elite', 15, 1.47348, 1.479, 1.468),
  ('EUR/GBP', 'Compra', 'closed', -25, '-25 pips', 'Junho/2021', '2021-06-15', 'Finalizado', 16, true, 'stop', 'elite', 16, 0.86131, 0.86556, 0.85881),
  ('EUR/AUD', 'Compra', 'closed', 70, '+70 pips', 'Junho/2021', '2021-06-15', 'Finalizado', 17, true, 'take', 'elite', 17, 1.57802, 1.59772, 1.56991),
  ('WTI', 'Compra', 'closed', 34, '+34 pips', 'Junho/2021', '2021-06-17', 'Finalizado', 18, true, 'take', 'elite', 18, 0.69761, 0.70097, 0.69341),
  ('XAU/USD', 'Compra', 'closed', 46, '+46 pips', 'Junho/2021', '2021-06-17', 'Finalizado', 19, true, 'take', 'elite', 19, 1773.2, 1777.79, 1768.83),
  ('EUR/AUD', 'Compra', 'closed', 57, '+57 pips', 'Junho/2021', '2021-06-17', 'Finalizado', 20, true, 'take', 'elite', 20, 1.57724, 1.58292, 1.57022),
  ('XAU/USD', 'Compra', 'closed', 51, '+51 pips', 'Junho/2021', '2021-06-18', 'Finalizado', 21, true, 'take', 'elite', 21, 1773.63, 1778.7, 1769.88),
  ('XAU/USD', 'Compra', 'closed', 50, '+50 pips', 'Junho/2021', '2021-06-20', 'Finalizado', 22, true, 'take', 'elite', 22, 1779, 1784, 1776.4),
  ('USD/CAD', 'Compra', 'closed', 15, '+15 pips', 'Junho/2021', '2021-06-21', 'Finalizado', 23, true, 'take', 'elite', 23, null, null, null),
  ('XAU/USD', 'Compra', 'closed', 50, '+50 pips', 'Junho/2021', '2021-06-22', 'Finalizado', 24, true, 'take', 'elite', 24, 1779.27, 1785.14, 1774.88),
  ('XAU/USD', 'Compra', 'closed', 52, '+52 pips', 'Junho/2021', '2021-06-23', 'Finalizado', 25, true, 'take', 'elite', 25, 1783.75, 1788.95, 1777.93),
  ('EUR/CAD', 'Compra', 'closed', 25, '+25 pips', 'Junho/2021', '2021-06-24', 'Finalizado', 26, true, 'take', 'elite', 26, 1.47117, 1.47366, 1.46688),
  ('GBP/NZD', 'Compra', 'closed', -30, '-30 pips', 'Junho/2021', '2021-06-25', 'Finalizado', 27, true, 'stop', 'elite', 27, 1.96751, 1.9714, 1.9645),
  ('XAU/USD', 'Compra', 'closed', 45, '+45 pips', 'Junho/2021', '2021-06-25', 'Finalizado', 28, true, 'take', 'elite', 28, 1784.67, 1794, 1778.22),
  ('CAD/JPY', 'Venda', 'closed', -27, '-27 pips', 'Junho/2021', '2021-06-25', 'Finalizado', 29, true, 'stop', 'elite', 29, 89.957, 89.537, 90.225),
  ('USD/CAD', 'Compra', 'closed', 40, '+40 pips', 'Junho/2021', '2021-06-28', 'Finalizado', 30, true, 'take', 'elite', 30, 1.23341, 1.2395, 1.22977),
  ('GBP/CAD', 'Compra', 'closed', -35, '-35 pips', 'Junho/2021', '2021-06-29', 'Finalizado', 31, true, 'stop', 'elite', 31, 1.71779, 1.72282, 1.71431),
  ('EUR/AUD', 'Compra', 'closed', 90, '+90 pips', 'Junho/2021', '2021-06-30', 'Finalizado', 32, true, 'take', 'elite', 32, 1.58319, 1.59222, 1.57606);
