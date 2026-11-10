-- Elite: Agosto/2023 (22 sinais, +41 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2023, 7, 'Agosto', 22, 41, '+41 pips', 'Finalizado', array['EUR/GBP', 'GBP/JPY', 'USD/CAD', 'XAU/USD', 'EUR/JPY', 'EUR/AUD', 'CAD/CHF', 'GBP/USD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Agosto/2023';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('EUR/GBP', 'Compra', 'closed', 38, '+38 pips', 'Agosto/2023', '2023-08-01', 'Finalizado', 1, true, 'take', 'elite', 1, 0.85759, 0.8615, 0.8545),
  ('GBP/JPY', 'Venda', 'closed', 146, '+146 pips', 'Agosto/2023', '2023-08-02', 'Finalizado', 2, true, 'take', 'elite', 2, 182.3, 180.2, 183.1),
  ('USD/CAD', 'Compra', 'closed', 25, '+25 pips', 'Agosto/2023', '2023-08-03', 'Finalizado', 3, true, 'take', 'elite', 3, 1.33539, 1.3389, 1.33),
  ('XAU/USD', 'Venda', 'closed', 8, '+8 pips', 'Agosto/2023', '2023-08-03', 'Finalizado', 4, true, 'take', 'elite', 4, 1935.83, 1910.6, 1943.51),
  ('EUR/JPY', 'Venda', 'closed', -49, '-49 pips', 'Agosto/2023', '2023-08-07', 'Finalizado', 5, true, 'stop', 'elite', 5, 156.161, 154.9, 156.654),
  ('EUR/AUD', 'Compra', 'closed', 70, '+70 pips', 'Agosto/2023', '2023-08-07', 'Finalizado', 6, true, 'take', 'elite', 6, 1.678, 1.687, 1.669),
  ('CAD/CHF', 'Compra', 'closed', -23, '-23 pips', 'Agosto/2023', '2023-08-09', 'Finalizado', 7, true, 'stop', 'elite', 7, 0.6538, 0.6552, 0.6515),
  ('XAU/USD', 'Compra', 'closed', 20, '+20 pips', 'Agosto/2023', '2023-08-10', 'Finalizado', 8, true, 'take', 'elite', 8, 1915.5, 1923.09, 1906.12),
  ('EUR/JPY', 'Venda', 'closed', -85, '-85 pips', 'Agosto/2023', '2023-08-11', 'Finalizado', 9, true, 'stop', 'elite', 9, 158.75, 157.9, 159.4),
  ('CAD/CHF', 'Compra', 'closed', 2, '+2 pips', 'Agosto/2023', '2023-08-14', 'Finalizado', 10, true, 'take', 'elite', 10, 0.6525, 0.654, 0.65),
  ('XAU/USD', 'Compra', 'closed', 21, '+21 pips', 'Agosto/2023', '2023-08-15', 'Finalizado', 11, true, 'take', 'elite', 11, 1902.5, 1904.6, 1899.5),
  ('XAU/USD', 'Compra', 'closed', -57, '-57 pips', 'Agosto/2023', '2023-08-16', 'Finalizado', 12, true, 'stop', 'elite', 12, 1905.03, 1911.47, 1899.37),
  ('GBP/USD', 'Compra', 'closed', -75, '-75 pips', 'Agosto/2023', '2023-08-17', 'Finalizado', 13, true, 'stop', 'elite', 13, 1.2759, 1.2865, 1.26842),
  ('USD/CHF', 'Venda', 'closed', -27, '-27 pips', 'Agosto/2023', '2023-08-21', 'Finalizado', 14, true, 'stop', 'elite', 14, 0.878, 0.876, 0.8807),
  ('NZD/USD', 'Compra', 'closed', 15, '+15 pips', 'Agosto/2023', '2023-08-21', 'Finalizado', 15, true, 'take', 'elite', 15, 0.593, 0.5945, 0.591),
  ('GBP/CHF', 'Compra', 'closed', -23, '-23 pips', 'Agosto/2023', '2023-08-22', 'Finalizado', 16, true, 'stop', 'elite', 16, 1.12169, 1.1245, 1.1194),
  ('NZD/JPY', 'Venda', 'closed', -20, '-20 pips', 'Agosto/2023', '2023-08-23', 'Finalizado', 17, true, 'stop', 'elite', 17, 86.472, 87.176, 85.75),
  ('XAU/USD', 'Compra', 'closed', -30, '-30 pips', 'Agosto/2023', '2023-08-25', 'Finalizado', 18, true, 'stop', 'elite', 18, 1919.24, 1921.67, 1916.28),
  ('AUD/CHF', 'Compra', 'closed', 25, '+25 pips', 'Agosto/2023', '2023-08-28', 'Finalizado', 19, true, 'take', 'elite', 19, 0.568, 0.5799, 0.5638),
  ('USD/CAD', 'Compra', 'closed', -30, '-30 pips', 'Agosto/2023', '2023-08-29', 'Finalizado', 20, true, 'stop', 'elite', 20, 1.362, 1.364, 1.359),
  ('GBP/AUD', 'Venda', 'closed', 40, '+40 pips', 'Agosto/2023', '2023-08-29', 'Finalizado', 21, true, 'take', 'elite', 21, 1.958, 1.9445, 1.9635),
  ('GBP/NZD', 'Venda', 'closed', 50, '+50 pips', 'Agosto/2023', '2023-08-31', 'Finalizado', 22, true, 'take', 'elite', 22, 2.1208, 2.112, 2.13073);
