-- Elite: Julho/2022 (54 sinais, +750 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2022, 6, 'Julho', 54, 750, '+750 pips', 'Finalizado', array['WTI', 'USD/JPY', 'EUR/GBP', 'EUR/JPY', 'XAU/USD', 'EUR/NZD', 'EUR/CAD', 'CAD/JPY']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Julho/2022';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('WTI', 'Compra', 'closed', 70, '+70 pips', 'Julho/2022', '2022-07-01', 'Finalizado', 1, true, 'take', 'elite', 1, 1.06251, 1.07708, 1.05737),
  ('USD/JPY', 'Venda', 'closed', 20, '+20 pips', 'Julho/2022', '2022-07-03', 'Finalizado', 2, true, 'take', 'elite', 2, 135.163, 134.812, 135.743),
  ('EUR/GBP', 'Compra', 'closed', -30, '-30 pips', 'Julho/2022', '2022-07-03', 'Finalizado', 3, true, 'stop', 'elite', 3, 0.86184, 0.86446, 0.85885),
  ('EUR/GBP', 'Compra', 'closed', 48, '+48 pips', 'Julho/2022', '2022-07-01', 'Finalizado', 4, true, 'take', 'elite', 4, 0.8626, 0.86742, null),
  ('EUR/GBP', 'Compra', 'closed', 66, '+66 pips', 'Julho/2022', '2022-07-01', 'Finalizado', 5, true, 'take', 'elite', 5, 0.8609, 0.86749, null),
  ('WTI', 'Compra', 'closed', -184, '-184 pips', 'Julho/2022', '2022-07-04', 'Finalizado', 6, true, 'stop', 'elite', 6, 1.08664, 1.10749, 1.06823),
  ('EUR/JPY', 'Venda', 'closed', 28, '+28 pips', 'Julho/2022', '2022-07-04', 'Finalizado', 7, true, 'take', 'elite', 7, 138.775, 138.492, 139.196),
  ('XAU/USD', 'Venda', 'closed', 118, '+118 pips', 'Julho/2022', '2022-07-05', 'Finalizado', 8, true, 'take', 'elite', 8, 1756.46, 1744.64, null),
  ('EUR/NZD', 'Venda', 'closed', 49, '+49 pips', 'Julho/2022', '2022-07-06', 'Finalizado', 9, true, 'take', 'elite', 9, 1.65559, 1.65066, 1.65752),
  ('WTI', 'Compra', 'closed', 73, '+73 pips', 'Julho/2022', '2022-07-06', 'Finalizado', 10, true, 'take', 'elite', 10, 0.95767, 0.97471, 0.95038),
  ('EUR/CAD', 'Venda', 'closed', 31, '+31 pips', 'Julho/2022', '2022-07-07', 'Finalizado', 11, true, 'take', 'elite', 11, 1.32208, 1.31899, 1.32641),
  ('WTI', 'Venda', 'closed', 30, '+30 pips', 'Julho/2022', '2022-07-07', 'Finalizado', 12, true, 'take', 'elite', 12, null, null, null),
  ('EUR/GBP', 'Compra', 'closed', 2, '+2 pips', 'Julho/2022', '2022-07-07', 'Finalizado', 13, true, 'take', 'elite', 13, 0.84586, 0.84789, 0.84314),
  ('XAU/USD', 'Compra', 'closed', -28, '-28 pips', 'Julho/2022', '2022-07-07', 'Finalizado', 14, true, 'stop', 'elite', 14, 1743.55, 1747.03, 1740.73),
  ('WTI', 'Compra', 'closed', -43, '-43 pips', 'Julho/2022', '2022-08-08', 'Finalizado', 15, true, 'stop', 'elite', 15, 1.01097, 1.01807, 1.00672),
  ('WTI', 'Compra', 'closed', 75, '+75 pips', 'Julho/2022', '2022-07-08', 'Finalizado', 16, true, 'take', 'elite', 16, 1.01067, 1.01814, null),
  ('XAU/USD', 'Compra', 'closed', -72, '-72 pips', 'Julho/2022', '2022-07-10', 'Finalizado', 17, true, 'stop', 'elite', 17, 1743.91, 1749.34, 1736.75),
  ('USD/JPY', 'Compra', 'closed', 97, '+97 pips', 'Julho/2022', '2022-07-10', 'Finalizado', 18, true, 'take', 'elite', 18, 136.236, 137.21, 135.54),
  ('EUR/CAD', 'Venda', 'closed', 21, '+21 pips', 'Julho/2022', '2022-07-10', 'Finalizado', 19, true, 'take', 'elite', 19, 1.31627, 1.31422, 1.32057),
  ('CAD/JPY', 'Compra', 'closed', 54, '+54 pips', 'Julho/2022', '2022-07-10', 'Finalizado', 20, true, 'take', 'elite', 20, 105.233, 106.745, 104.198),
  ('EUR/GBP', 'Compra', 'closed', -28, '-28 pips', 'Julho/2022', '2022-07-11', 'Finalizado', 21, true, 'stop', 'elite', 21, 0.84822, 0.84966, 0.84541),
  ('WTI', 'Venda', 'closed', 177, '+177 pips', 'Julho/2022', '2022-07-11', 'Finalizado', 22, true, 'take', 'elite', 22, 1.00422, 0.98657, 1.02209),
  ('XAU/USD', 'Venda', 'closed', 22, '+22 pips', 'Julho/2022', '2022-07-12', 'Finalizado', 23, true, 'take', 'elite', 23, 1728.61, 1726.4, null),
  ('USD/CAD', 'Compra', 'closed', -42, '-42 pips', 'Julho/2022', '2022-07-12', 'Finalizado', 24, true, 'stop', 'elite', 24, 1.30296, 1.31066, 1.2988),
  ('AUD/CAD', 'Compra', 'closed', 20, '+20 pips', 'Julho/2022', '2022-07-12', 'Finalizado', 25, true, 'take', 'elite', 25, 0.88019, 0.88214, 0.8776),
  ('NZD/JPY', 'Compra', 'closed', 54, '+54 pips', 'Julho/2022', '2022-07-12', 'Finalizado', 26, true, 'take', 'elite', 26, 85.06, 84.533, 83.618),
  ('GBP/NZD', 'Venda', 'closed', -60, '-60 pips', 'Julho/2022', '2022-07-12', 'Finalizado', 27, true, 'stop', 'elite', 27, 1.93725, 1.90126, 1.94321),
  ('WTI', 'Compra', 'closed', -73, '-73 pips', 'Julho/2022', '2022-07-13', 'Finalizado', 28, true, 'stop', 'elite', 28, 0.94099, 0.94807, 0.93373),
  ('XAU/USD', 'Compra', 'closed', -20, '-20 pips', 'Julho/2022', '2022-07-13', 'Finalizado', 29, true, 'stop', 'elite', 29, null, null, null),
  ('EUR/JPY', 'Compra', 'closed', 97, '+97 pips', 'Julho/2022', '2022-07-13', 'Finalizado', 30, true, 'take', 'elite', 30, 138.343, 139.317, 137.64),
  ('AUD/USD', 'Venda', 'closed', -69, '-69 pips', 'Julho/2022', '2022-07-14', 'Finalizado', 31, true, 'stop', 'elite', 31, 0.67011, 0.65597, 0.67699),
  ('GBP/NZD', 'Venda', 'closed', 95, '+95 pips', 'Julho/2022', '2022-07-14', 'Finalizado', 32, true, 'take', 'elite', 32, 1.93956, 1.93006, 1.94603),
  ('EUR/NZD', 'Venda', 'closed', -54, '-54 pips', 'Julho/2022', '2022-07-14', 'Finalizado', 33, true, 'stop', 'elite', 33, 1.63468, 1.6259, 1.6401),
  ('WTI', 'Compra', 'closed', -107, '-107 pips', 'Julho/2022', '2022-07-14', 'Finalizado', 34, true, 'stop', 'elite', 34, 0.93949, 0.94728, 0.92877),
  ('EUR/NZD', 'Venda', 'closed', -182, '-182 pips', 'Julho/2022', '2022-07-17', 'Finalizado', 35, true, 'stop', 'elite', 35, 1.63174, 1.60067, 1.64989),
  ('USD/JPY', 'Venda', 'closed', 46, '+46 pips', 'Julho/2022', '2022-07-17', 'Finalizado', 36, true, 'take', 'elite', 36, 138.087, 137.627, 138.488),
  ('CAD/JPY', 'Compra', 'closed', 10, '+10 pips', 'Julho/2022', '2022-07-18', 'Finalizado', 37, true, 'take', 'elite', 37, 107.057, 107.958, 106.035),
  ('AUD/CHF', 'Compra', 'closed', -7, '-7 pips', 'Julho/2022', '2022-07-18', 'Finalizado', 38, true, 'stop', 'elite', 38, 0.6691, 0.67459, 0.66334),
  ('EUR/NZD', 'Venda', 'closed', 51, '+51 pips', 'Julho/2022', '2022-07-19', 'Finalizado', 39, true, 'take', 'elite', 39, 1.6362, 1.63109, 1.64365),
  ('XAU/USD', 'Venda', 'closed', 41, '+41 pips', 'Julho/2022', '2022-07-20', 'Finalizado', 40, true, 'take', 'elite', 40, 1707.09, 1700.11, 1713.88),
  ('WTI', 'Venda', 'closed', 120, '+120 pips', 'Julho/2022', '2022-07-20', 'Finalizado', 41, true, 'take', 'elite', 41, 0.98651, 0.97456, 0.99394),
  ('EUR/CAD', 'Compra', 'closed', 13, '+13 pips', 'Julho/2022', '2022-07-20', 'Finalizado', 42, true, 'take', 'elite', 42, 1.31335, 1.31468, 1.31076),
  ('EUR/CHF', 'Venda', 'closed', 45, '+45 pips', 'Julho/2022', '2022-07-21', 'Finalizado', 43, true, 'take', 'elite', 43, 0.9868, 0.98233, 0.99235),
  ('XAU/USD', 'Compra', 'closed', 126, '+126 pips', 'Julho/2022', '2022-07-22', 'Finalizado', 44, true, 'take', 'elite', 44, 1717.39, 1730, 1711.97),
  ('EUR/GBP', 'Venda', 'closed', 19, '+19 pips', 'Julho/2022', '2022-07-25', 'Finalizado', 45, true, 'take', 'elite', 45, 0.84762, 0.8495, 0.84435),
  ('XAU/USD', 'Venda', 'closed', -51, '-51 pips', 'Julho/2022', '2022-07-26', 'Finalizado', 46, true, 'stop', 'elite', 46, 1718.33, 1711.38, 1723.45),
  ('EUR/GBP', 'Compra', 'closed', -11, '-11 pips', 'Julho/2022', '2022-07-26', 'Finalizado', 47, true, 'stop', 'elite', 47, 0.84224, 0.84294, 0.84112),
  ('WTI', 'Venda', 'closed', 18, '+18 pips', 'Julho/2022', '2022-07-26', 'Finalizado', 48, true, 'take', 'elite', 48, 0.9443, 0.93231, 0.94827),
  ('XAU/USD', 'Venda', 'closed', 20, '+20 pips', 'Julho/2022', '2022-07-27', 'Finalizado', 49, true, 'take', 'elite', 49, 1726.62, 1722.64, 1721.75),
  ('WTI', 'Venda', 'closed', -55, '-55 pips', 'Julho/2022', '2022-07-27', 'Finalizado', 50, true, 'stop', 'elite', 50, 0.95366, null, 0.94818),
  ('XAU/USD', 'Compra', 'closed', 100, '+100 pips', 'Julho/2022', '2022-07-27', 'Finalizado', 51, true, 'take', 'elite', 51, 1724.54, 1739.38, 1714.53),
  ('USD/JPY', 'Venda', 'closed', 40, '+40 pips', 'Julho/2022', '2022-07-27', 'Finalizado', 52, true, 'take', 'elite', 52, 135.984, 135.076, 137.116),
  ('GBP/CHF', 'Venda', 'closed', -52, '-52 pips', 'Julho/2022', '2022-07-28', 'Finalizado', 53, true, 'stop', 'elite', 53, 1.15947, 1.1535, 1.16467),
  ('NZD/CHF', 'Venda', 'closed', 22, '+22 pips', 'Julho/2022', '2022-07-28', 'Finalizado', 54, true, 'take', 'elite', 54, 0.59961, 0.59209, 0.60488);
