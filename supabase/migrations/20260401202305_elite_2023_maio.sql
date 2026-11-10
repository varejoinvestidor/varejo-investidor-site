-- Elite: Maio/2023 (27 sinais, -51 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2023, 4, 'Maio', 27, -51, '-51 pips', 'Finalizado', array['EUR/CHF', 'GBP/CHF', 'EUR/GBP', 'CHF/JPY', 'USD/CAD', 'GBP/USD', 'NZD/JPY', 'XAU/USD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Maio/2023';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('EUR/CHF', 'Venda', 'closed', 50, '+50 pips', 'Maio/2023', '2023-05-01', 'Finalizado', 1, true, 'take', 'elite', 1, 0.98307, 0.97589, 0.9915),
  ('GBP/CHF', 'Venda', 'closed', -30, '-30 pips', 'Maio/2023', '2023-05-02', 'Finalizado', 2, true, 'stop', 'elite', 2, 1.119, 1.116, 1.122),
  ('EUR/GBP', 'Compra', 'closed', -37, '-37 pips', 'Maio/2023', '2023-05-02', 'Finalizado', 3, true, 'stop', 'elite', 3, 0.88274, 0.888, 0.879),
  ('CHF/JPY', 'Venda', 'closed', 40, '+40 pips', 'Maio/2023', '2023-05-02', 'Finalizado', 4, true, 'take', 'elite', 4, 152.772, 151.82, 153.353),
  ('USD/CAD', 'Compra', 'closed', -58, '-58 pips', 'Maio/2023', '2023-05-03', 'Finalizado', 5, true, 'stop', 'elite', 5, 1.3633, 1.3675, 1.3575),
  ('GBP/USD', 'Compra', 'closed', -10, '-10 pips', 'Maio/2023', '2023-05-03', 'Finalizado', 6, true, 'stop', 'elite', 6, 1.25881, 1.2865, 1.24072),
  ('EUR/CHF', 'Venda', 'closed', 15, '+15 pips', 'Maio/2023', '2023-05-04', 'Finalizado', 7, true, 'take', 'elite', 7, 0.97647, 0.951, 0.9875),
  ('NZD/JPY', 'Compra', 'closed', 5, '+5 pips', 'Maio/2023', '2023-05-04', 'Finalizado', 8, true, 'take', 'elite', 8, 84.479, 87, 83.9),
  ('XAU/USD', 'Compra', 'closed', 60, '+60 pips', 'Maio/2023', '2023-05-05', 'Finalizado', 9, true, 'take', 'elite', 9, null, null, null),
  ('XAU/USD', 'Venda', 'closed', -20, '-20 pips', 'Maio/2023', '2023-05-08', 'Finalizado', 10, true, 'stop', 'elite', 10, null, null, null),
  ('CHF/JPY', 'Compra', 'closed', -67, '-67 pips', 'Maio/2023', '2023-05-08', 'Finalizado', 11, true, 'stop', 'elite', 11, 151.867, 152.5, 151.2),
  ('CHF/JPY', 'Compra', 'closed', -66, '-66 pips', 'Maio/2023', '2023-05-09', 'Finalizado', 12, true, 'stop', 'elite', 12, 152.058, 152.5, 151.4),
  ('EUR/CAD', 'Compra', 'closed', -39, '-39 pips', 'Maio/2023', '2023-05-11', 'Finalizado', 13, true, 'stop', 'elite', 13, 1.47289, 1.478, 1.469),
  ('EUR/NZD', 'Venda', 'closed', 90, '+90 pips', 'Maio/2023', '2023-05-16', 'Finalizado', 14, true, 'take', 'elite', 14, 1.74031, 1.723, 1.748),
  ('XAU/USD', 'Compra', 'closed', -22, '-22 pips', 'Maio/2023', '2023-05-17', 'Finalizado', 15, true, 'stop', 'elite', 15, 1984, 1987, 1981.8),
  ('EUR/AUD', 'Venda', 'closed', 37, '+37 pips', 'Maio/2023', '2023-05-18', 'Finalizado', 16, true, 'take', 'elite', 16, 1.6245, 1.6208, 1.6285),
  ('XAU/USD', 'Compra', 'closed', 30, '+30 pips', 'Maio/2023', '2023-05-18', 'Finalizado', 17, true, 'take', 'elite', 17, 1961, 1964, 1955),
  ('EUR/AUD', 'Compra', 'closed', 140, '+140 pips', 'Maio/2023', '2023-05-21', 'Finalizado', 18, true, 'take', 'elite', 18, 1.62719, 1.642, 1.6195),
  ('GBP/CAD', 'Venda', 'closed', -96, '-96 pips', 'Maio/2023', '2023-05-22', 'Finalizado', 19, true, 'stop', 'elite', 19, 1.67741, 1.663, 1.687),
  ('XAU/USD', 'Venda', 'closed', -173, '-173 pips', 'Maio/2023', '2023-05-22', 'Finalizado', 20, true, 'stop', 'elite', 20, 1960.74, 1929.37, 1977.99),
  ('AUD/CHF', 'Venda', 'closed', 50, '+50 pips', 'Maio/2023', '2023-05-23', 'Finalizado', 21, true, 'take', 'elite', 21, 0.596, 0.58733, 0.599),
  ('GBP/CHF', 'Venda', 'closed', -41, '-41 pips', 'Maio/2023', '2023-05-24', 'Finalizado', 22, true, 'stop', 'elite', 22, 1.11761, 1.11094, 1.1217),
  ('EUR/GBP', 'Compra', 'closed', -20, '-20 pips', 'Maio/2023', '2023-05-25', 'Finalizado', 23, true, 'stop', 'elite', 23, 0.86999, 0.8729, 0.868),
  ('EUR/JPY', 'Compra', 'closed', 80, '+80 pips', 'Maio/2023', '2023-05-25', 'Finalizado', 24, true, 'take', 'elite', 24, 149.96, 150.85, 149.65),
  ('XAU/USD', 'Venda', 'closed', 110, '+110 pips', 'Maio/2023', '2023-05-29', 'Finalizado', 25, true, 'take', 'elite', 25, 1944.44, 1927.9, 1949.6),
  ('EUR/CAD', 'Compra', 'closed', -20, '-20 pips', 'Maio/2023', '2023-05-30', 'Finalizado', 26, true, 'stop', 'elite', 26, 1.46101, 1.455, 1.4795),
  ('EUR/AUD', 'Compra', 'closed', -59, '-59 pips', 'Maio/2023', '2023-05-30', 'Finalizado', 27, true, 'stop', 'elite', 27, 1.64793, 1.657, 1.642);
