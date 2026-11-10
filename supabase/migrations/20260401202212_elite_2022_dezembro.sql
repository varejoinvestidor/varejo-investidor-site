-- Elite: Dezembro/2022 (37 sinais, +269 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2022, 11, 'Dezembro', 37, 269, '+269 pips', 'Finalizado', array['GBP/NZD', 'GBP/AUD', 'EUR/AUD', 'XAU/USD', 'USD/CHF', 'EUR/NZD', 'GBP/JPY', 'AUD/NZD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Dezembro/2022';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('GBP/NZD', 'Venda', 'closed', 48, '+48 pips', 'Dezembro/2022', '2022-12-01', 'Finalizado', 1, true, 'take', 'elite', 1, 1.92076, 1.916, 1.92885),
  ('GBP/AUD', 'Compra', 'closed', 43, '+43 pips', 'Dezembro/2022', '2022-12-02', 'Finalizado', 2, true, 'take', 'elite', 2, 1.80067, 1.805, 1.7975),
  ('GBP/NZD', 'Venda', 'closed', -105, '-105 pips', 'Dezembro/2022', '2022-12-05', 'Finalizado', 3, true, 'stop', 'elite', 3, 1.9155, 1.905, 1.926),
  ('EUR/AUD', 'Compra', 'closed', 65, '+65 pips', 'Dezembro/2022', '2022-12-05', 'Finalizado', 4, true, 'take', 'elite', 4, 1.55354, 1.56, 1.549),
  ('XAU/USD', 'Compra', 'closed', 39, '+39 pips', 'Dezembro/2022', '2022-12-05', 'Finalizado', 5, true, 'take', 'elite', 5, 1770.15, 1774, 1767),
  ('XAU/USD', 'Compra', 'closed', 30, '+30 pips', 'Dezembro/2022', '2022-12-06', 'Finalizado', 6, true, 'take', 'elite', 6, 1771.64, 1778.35, 1766.46),
  ('XAU/USD', 'Compra', 'closed', 29, '+29 pips', 'Dezembro/2022', '2022-12-07', 'Finalizado', 7, true, 'take', 'elite', 7, 1775.15, 1778, 1770),
  ('GBP/NZD', 'Venda', 'closed', -85, '-85 pips', 'Dezembro/2022', '2022-12-07', 'Finalizado', 8, true, 'stop', 'elite', 8, 1.9155, 1.9055, 1.924),
  ('XAU/USD', 'Compra', 'closed', 43, '+43 pips', 'Dezembro/2022', '2022-12-07', 'Finalizado', 9, true, 'take', 'elite', 9, 1782.72, 1787, 1778),
  ('USD/CHF', 'Venda', 'closed', 31, '+31 pips', 'Dezembro/2022', '2022-12-08', 'Finalizado', 10, true, 'take', 'elite', 10, 0.93835, 0.9353, 0.942),
  ('EUR/NZD', 'Venda', 'closed', -58, '-58 pips', 'Dezembro/2022', '2022-12-08', 'Finalizado', 11, true, 'stop', 'elite', 11, 1.65186, 1.64424, 1.65764),
  ('XAU/USD', 'Compra', 'closed', -21, '-21 pips', 'Dezembro/2022', '2022-12-09', 'Finalizado', 12, true, 'stop', 'elite', 12, 1798.45, 1803.3, 1796.34),
  ('GBP/JPY', 'Compra', 'closed', 50, '+50 pips', 'Dezembro/2022', '2022-12-11', 'Finalizado', 13, true, 'take', 'elite', 13, 167.474, 168.2, 166.83),
  ('AUD/NZD', 'Compra', 'closed', -40, '-40 pips', 'Dezembro/2022', '2022-12-11', 'Finalizado', 14, true, 'stop', 'elite', 14, 1.06058, 1.06377, 1.05657),
  ('CAD/JPY', 'Compra', 'closed', 60, '+60 pips', 'Dezembro/2022', '2022-12-12', 'Finalizado', 15, true, 'take', 'elite', 15, 100.187, 101, 99.621),
  ('CHF/JPY', 'Compra', 'closed', 20, '+20 pips', 'Dezembro/2022', '2022-12-12', 'Finalizado', 16, true, 'take', 'elite', 16, 147.075, 147.5, 146.717),
  ('NZD/CHF', 'Compra', 'closed', 12, '+12 pips', 'Dezembro/2022', '2022-12-12', 'Finalizado', 17, true, 'take', 'elite', 17, 0.598, 0.6, 0.596),
  ('EUR/CHF', 'Compra', 'closed', 23, '+23 pips', 'Dezembro/2022', '2022-12-12', 'Finalizado', 18, true, 'take', 'elite', 18, 0.98665, 0.9889, 0.98463),
  ('GBP/CHF', 'Compra', 'closed', -64, '-64 pips', 'Dezembro/2022', '2022-12-13', 'Finalizado', 19, true, 'stop', 'elite', 19, 1.14939, 1.154, 1.143),
  ('GBP/USD', 'Compra', 'closed', -16, '-16 pips', 'Dezembro/2022', '2022-12-13', 'Finalizado', 20, true, 'stop', 'elite', 20, 1.23689, 1.238, 1.2353),
  ('GBP/JPY', 'Venda', 'closed', 35, '+35 pips', 'Dezembro/2022', '2022-12-13', 'Finalizado', 21, true, 'take', 'elite', 21, 167.3, 166.75, 167.97),
  ('EUR/CHF', 'Compra', 'closed', 35, '+35 pips', 'Dezembro/2022', '2022-12-13', 'Finalizado', 22, true, 'take', 'elite', 22, 0.9878, 0.992, 0.983),
  ('EUR/PY', 'Venda', 'closed', 34, '+34 pips', 'Dezembro/2022', '2022-12-14', 'Finalizado', 23, true, 'take', 'elite', 23, 1.44, 1.4455, 1.432),
  ('AUD/USD', 'Compra', 'closed', -40, '-40 pips', 'Dezembro/2022', '2022-12-15', 'Finalizado', 24, true, 'stop', 'elite', 24, 0.677, 0.6675, 0.673),
  ('AUD/USD', 'Compra', 'closed', 25, '+25 pips', 'Dezembro/2022', '2022-12-15', 'Finalizado', 25, true, 'take', 'elite', 25, 0.6705, 0.673, 0.6675),
  ('XAU/USD', 'Compra', 'closed', 60, '+60 pips', 'Dezembro/2022', '2022-12-15', 'Finalizado', 26, true, 'take', 'elite', 26, 1777.29, 1784.36, 1772.39),
  ('WTI', 'Venda', 'closed', 161, '+161 pips', 'Dezembro/2022', '2022-12-15', 'Finalizado', 27, true, 'take', 'elite', 27, 0.7621, 0.746, 0.772),
  ('EUR/CHF', 'Compra', 'closed', 13, '+13 pips', 'Dezembro/2022', '2022-12-16', 'Finalizado', 28, true, 'take', 'elite', 28, 0.98881, 0.9913, 0.98562),
  ('EUR/NZD', 'Venda', 'closed', 30, '+30 pips', 'Dezembro/2022', '2022-12-16', 'Finalizado', 29, true, 'take', 'elite', 29, 1.66901, 1.663, 1.6778),
  ('GBP/CAD', 'Venda', 'closed', 30, '+30 pips', 'Dezembro/2022', '2022-12-19', 'Finalizado', 30, true, 'take', 'elite', 30, 1.661, 1.656, 1.6655),
  ('EUR/GBP', 'Compra', 'closed', 30, '+30 pips', 'Dezembro/2022', '2022-12-19', 'Finalizado', 31, true, 'take', 'elite', 31, 0.8725, 0.88, 0.868),
  ('NZD/JPY', 'Compra', 'closed', -35, '-35 pips', 'Dezembro/2022', '2022-12-19', 'Finalizado', 32, true, 'stop', 'elite', 32, 84.45, 84.8, 84.1),
  ('GBP/CAD', 'Venda', 'closed', 35, '+35 pips', 'Dezembro/2022', '2022-12-20', 'Finalizado', 33, true, 'take', 'elite', 33, 1.44772, 1.441, 1.45384),
  ('EUR/USD', 'Compra', 'closed', -34, '-34 pips', 'Dezembro/2022', '2022-12-21', 'Finalizado', 34, true, 'stop', 'elite', 34, 1.06342, 1.06544, 1.06),
  ('XAU/USD', 'Compra', 'closed', -112, '-112 pips', 'Dezembro/2022', '2022-12-22', 'Finalizado', 35, true, 'stop', 'elite', 35, 1819.18, 1833.64, 1808),
  ('EUR/USD', 'Compra', 'closed', -30, '-30 pips', 'Dezembro/2022', '2022-12-22', 'Finalizado', 36, true, 'stop', 'elite', 36, 1.063, null, null),
  ('GBP/NZD', 'Venda', 'closed', -72, '-72 pips', 'Dezembro/2022', '2022-12-22', 'Finalizado', 37, true, 'stop', 'elite', 37, 1.91712, 1.908, 1.92428);
