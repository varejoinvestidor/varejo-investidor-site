-- Elite: Março/2023 (60 sinais, +632 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2023, 2, 'Março', 60, 632, '+632 pips', 'Finalizado', array['XAU/USD', 'GBP/USD', 'WTI', 'GBP/CHF', 'GBP/JPY', 'NZD/JPY', 'GBP/NZD', 'AUD/CAD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Março/2023';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('XAU/USD', 'Compra', 'closed', 103, '+103 pips', 'Março/2023', '2023-03-01', 'Finalizado', 1, true, 'take', 'elite', 1, 1830.5, 1840.83, 1823.36),
  ('XAU/USD', 'Venda', 'closed', 50, '+50 pips', 'Março/2023', '2023-03-01', 'Finalizado', 2, true, 'take', 'elite', 2, 1836.18, 1830, 1839.9),
  ('GBP/USD', 'Venda', 'closed', 62, '+62 pips', 'Março/2023', '2023-03-01', 'Finalizado', 3, true, 'take', 'elite', 3, 1.20053, 1.1943, 1.2076),
  ('XAU/USD', 'Compra', 'closed', 24, '+24 pips', 'Março/2023', '2023-03-02', 'Finalizado', 4, true, 'take', 'elite', 4, 1838.41, 1840.83, 1835.74),
  ('WTI', 'Venda', 'closed', -137, '-137 pips', 'Março/2023', '2023-03-03', 'Finalizado', 5, true, 'stop', 'elite', 5, 0.76743, 0.681, 0.78114),
  ('GBP/USD', 'Venda', 'closed', -76, '-76 pips', 'Março/2023', '2023-03-03', 'Finalizado', 6, true, 'stop', 'elite', 6, 1.19836, 1.142, 1.206),
  ('GBP/CHF', 'Venda', 'closed', 80, '+80 pips', 'Março/2023', '2023-03-06', 'Finalizado', 7, true, 'take', 'elite', 7, 1.12156, 1.091, 1.129),
  ('XAU/USD', 'Compra', 'closed', -25, '-25 pips', 'Março/2023', '2023-03-06', 'Finalizado', 8, true, 'stop', 'elite', 8, 1848.5, 1850.7, 1846),
  ('GBP/JPY', 'Venda', 'closed', 90, '+90 pips', 'Março/2023', '2023-03-07', 'Finalizado', 9, true, 'take', 'elite', 9, 163.136, 161.75, 163.6),
  ('GBP/CHF', 'Venda', 'closed', 46, '+46 pips', 'Março/2023', '2023-03-08', 'Finalizado', 10, true, 'take', 'elite', 10, 1.114, 1.109, 1.1185),
  ('WTI', 'Venda', 'closed', 306, '+306 pips', 'Março/2023', '2023-03-08', 'Finalizado', 11, true, 'take', 'elite', 11, 0.76658, 0.73599, 0.781),
  ('NZD/JPY', 'Venda', 'closed', 60, '+60 pips', 'Março/2023', '2023-03-08', 'Finalizado', 12, true, 'take', 'elite', 12, 83.614, 82.75, 84.2),
  ('XAU/USD', 'Compra', 'closed', 30, '+30 pips', 'Março/2023', '2023-03-09', 'Finalizado', 13, true, 'take', 'elite', 13, 1821, 1824, 1818),
  ('GBP/USD', 'Venda', 'closed', -33, '-33 pips', 'Março/2023', '2023-03-09', 'Finalizado', 14, true, 'stop', 'elite', 14, 1.19172, 1.18894, 1.195),
  ('XAU/USD', 'Venda', 'closed', -57, '-57 pips', 'Março/2023', '2023-03-09', 'Finalizado', 15, true, 'stop', 'elite', 15, 1828.66, 1823, 1836),
  ('XAU/USD', 'Venda', 'closed', 60, '+60 pips', 'Março/2023', '2023-03-10', 'Finalizado', 16, true, 'take', 'elite', 16, 1866.05, 1860.4, null),
  ('GBP/NZD', 'Compra', 'closed', 24, '+24 pips', 'Março/2023', '2023-03-13', 'Finalizado', 17, true, 'take', 'elite', 17, 1.95187, 1.9543, 1.949),
  ('AUD/CAD', 'Venda', 'closed', 20, '+20 pips', 'Março/2023', '2023-03-13', 'Finalizado', 18, true, 'take', 'elite', 18, 0.91351, 0.906, 0.916),
  ('WTI', 'Venda', 'closed', 80, '+80 pips', 'Março/2023', '2023-03-13', 'Finalizado', 19, true, 'take', 'elite', 19, 0.74473, 0.73676, 0.757),
  ('GBP/AUD', 'Compra', 'closed', -35, '-35 pips', 'Março/2023', '2023-03-14', 'Finalizado', 20, true, 'stop', 'elite', 20, 1.8205, 1.8235, 1.817),
  ('USD/CAD', 'Venda', 'closed', -35, '-35 pips', 'Março/2023', '2023-03-14', 'Finalizado', 21, true, 'stop', 'elite', 21, 1.36753, 1.363, 1.371),
  ('CHF/JPY', 'Compra', 'closed', -138, '-138 pips', 'Março/2023', '2023-03-15', 'Finalizado', 22, true, 'stop', 'elite', 22, 142.969, 144.25, 142.4),
  ('XAU/USD', 'Compra', 'closed', 190, '+190 pips', 'Março/2023', '2023-03-16', 'Finalizado', 23, true, 'take', 'elite', 23, 1926.1, 1947, 1908.75),
  ('USD/CAD', 'Venda', 'closed', -28, '-28 pips', 'Março/2023', '2023-03-16', 'Finalizado', 24, true, 'stop', 'elite', 24, 1.37322, 1.3715, 1.376),
  ('GBP/USD', 'Compra', 'closed', 36, '+36 pips', 'Março/2023', '2023-03-16', 'Finalizado', 25, true, 'take', 'elite', 25, 1.21344, 1.217, 1.207),
  ('GBP/USD', 'Compra', 'closed', 28, '+28 pips', 'Março/2023', '2023-03-17', 'Finalizado', 26, true, 'take', 'elite', 26, 1.21423, 1.217, 1.209),
  ('GBP/AUD', 'Venda', 'closed', -55, '-55 pips', 'Março/2023', '2023-03-19', 'Finalizado', 27, true, 'stop', 'elite', 27, 1.814, 1.8095, 1.8195),
  ('XAU/USD', 'Compra', 'closed', -72, '-72 pips', 'Março/2023', '2023-03-20', 'Finalizado', 28, true, 'stop', 'elite', 28, 1984.5, 1988.5, 1977.27),
  ('GBP/NZD', 'Compra', 'closed', 56, '+56 pips', 'Março/2023', '2023-03-20', 'Finalizado', 29, true, 'take', 'elite', 29, 1.9582, 1.9638, 1.9505),
  ('CAD/CHF', 'Compra', 'closed', 17, '+17 pips', 'Março/2023', '2023-03-20', 'Finalizado', 30, true, 'take', 'elite', 30, 1.97897, 1.9855, 1.973),
  ('XAU/USD', 'Compra', 'closed', 30, '+30 pips', 'Março/2023', '2023-03-20', 'Finalizado', 31, true, 'take', 'elite', 31, 1978.97, 1985.5, 1973),
  ('GBP/AUD', 'Compra', 'closed', 35, '+35 pips', 'Março/2023', '2023-03-20', 'Finalizado', 32, true, 'take', 'elite', 32, 1.83343, 1.8455, 1.82),
  ('GBP/USD', 'Venda', 'closed', 15, '+15 pips', 'Março/2023', '2023-03-21', 'Finalizado', 33, true, 'take', 'elite', 33, 1.223, 1.215, 1.229),
  ('XAU/USD', 'Compra', 'closed', 40, '+40 pips', 'Março/2023', '2023-03-21', 'Finalizado', 34, true, 'take', 'elite', 34, null, null, null),
  ('GBP/CHF', 'Compra', 'closed', 5, '+5 pips', 'Março/2023', '2023-03-21', 'Finalizado', 35, true, 'take', 'elite', 35, 1.126, 1.1275, 1.124),
  ('USD/CHF', 'Compra', 'closed', -22, '-22 pips', 'Março/2023', '2023-03-22', 'Finalizado', 36, true, 'stop', 'elite', 36, 0.92366, 0.9253, 0.9215),
  ('XAU/USD', 'Compra', 'closed', 60, '+60 pips', 'Março/2023', '2023-03-22', 'Finalizado', 37, true, 'take', 'elite', 37, 1953.49, 1962, 1948.13),
  ('EUR/AUD', 'Compra', 'closed', 30, '+30 pips', 'Março/2023', '2023-03-22', 'Finalizado', 38, true, 'take', 'elite', 38, 1.61925, 1.6393, 1.608),
  ('NZD/CHF', 'Compra', 'closed', 20, '+20 pips', 'Março/2023', '2023-03-22', 'Finalizado', 39, true, 'take', 'elite', 39, 0.573, 0.575, 0.571),
  ('XAU/USD', 'Compra', 'closed', 86, '+86 pips', 'Março/2023', '2023-03-22', 'Finalizado', 40, true, 'take', 'elite', 40, 1974.37, 1983, 1965),
  ('GBP/AUD', 'Compra', 'closed', 12, '+12 pips', 'Março/2023', '2023-03-23', 'Finalizado', 41, true, 'take', 'elite', 41, 1.83579, 1.8455, 1.829),
  ('XAU/USD', 'Compra', 'closed', 14, '+14 pips', 'Março/2023', '2023-03-23', 'Finalizado', 42, true, 'take', 'elite', 42, null, null, null),
  ('GBP/CHF', 'Venda', 'closed', 15, '+15 pips', 'Março/2023', '2023-03-23', 'Finalizado', 43, true, 'take', 'elite', 43, 1.1252, 1.1237, 1.1237),
  ('AUD/USD', 'Venda', 'closed', 28, '+28 pips', 'Março/2023', '2023-03-23', 'Finalizado', 44, true, 'take', 'elite', 44, 0.66642, 0.6585, 0.671),
  ('XAU/USD', 'Compra', 'closed', -120, '-120 pips', 'Março/2023', '2023-03-24', 'Finalizado', 45, true, 'stop', 'elite', 45, 1997.31, 2031.86, 1985.3),
  ('GBP/AUD', 'Compra', 'closed', 80, '+80 pips', 'Março/2023', '2023-03-24', 'Finalizado', 46, true, 'take', 'elite', 46, 1.841, 1.8495, 1.834),
  ('GBP/CHF', 'Compra', 'closed', 37, '+37 pips', 'Março/2023', '2023-03-27', 'Finalizado', 47, true, 'take', 'elite', 47, 1.125, 1.12868, 1.122),
  ('AUD/USD', 'Venda', 'closed', -52, '-52 pips', 'Março/2023', '2023-03-27', 'Finalizado', 48, true, 'stop', 'elite', 48, 0.664, 0.659, 0.6692),
  ('USD/CAD', 'Venda', 'closed', 30, '+30 pips', 'Março/2023', '2023-03-28', 'Finalizado', 49, true, 'take', 'elite', 49, 1.36422, 1.3605, 1.368),
  ('GBP/USD', 'Compra', 'closed', 19, '+19 pips', 'Março/2023', '2023-03-28', 'Finalizado', 50, true, 'take', 'elite', 50, 1.232, 1.2339, 1.23),
  ('XAU/USD', 'Compra', 'closed', -60, '-60 pips', 'Março/2023', '2023-03-29', 'Finalizado', 51, true, 'stop', 'elite', 51, 1966.26, 1973.15, 1960.28),
  ('GBP/CHF', 'Compra', 'closed', -60, '-60 pips', 'Março/2023', '2023-03-29', 'Finalizado', 52, true, 'stop', 'elite', 52, 1.135, 1.14, 1.129),
  ('EUR/GBP', 'Compra', 'closed', -20, '-20 pips', 'Março/2023', '2023-03-29', 'Finalizado', 53, true, 'stop', 'elite', 53, 0.88, 0.8815, 0.878),
  ('EUR/AUD', 'Compra', 'closed', -68, '-68 pips', 'Março/2023', '2023-03-29', 'Finalizado', 54, true, 'stop', 'elite', 54, 1.6248, 1.6335, 1.618),
  ('XAU/USD', 'Compra', 'closed', 5, '+5 pips', 'Março/2023', '2023-03-30', 'Finalizado', 55, true, 'take', 'elite', 55, 1980.37, 1996.24, 1967.79),
  ('GBP/USD', 'Compra', 'closed', 20, '+20 pips', 'Março/2023', '2023-03-30', 'Finalizado', 56, true, 'take', 'elite', 56, 1.238, 1.24, 1.236),
  ('GBP/CHF', 'Compra', 'closed', 5, '+5 pips', 'Março/2023', '2023-03-30', 'Finalizado', 57, true, 'take', 'elite', 57, 1.132, 1.141, 1.128),
  ('XAU/USD', 'Compra', 'closed', -32, '-32 pips', 'Março/2023', '2023-03-31', 'Finalizado', 58, true, 'stop', 'elite', 58, 1981.93, 1989, 1978.7),
  ('XAU/USD', 'Compra', 'closed', -160, '-160 pips', 'Março/2023', '2023-03-31', 'Finalizado', 59, true, 'stop', 'elite', 59, 1980.02, 1996, 1967),
  ('AUD/CHF', 'Venda', 'closed', -31, '-31 pips', 'Março/2023', '2023-03-31', 'Finalizado', 60, true, 'stop', 'elite', 60, 0.61214, 0.605, 0.6152);
