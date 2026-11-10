-- Elite: Março/2021 (41 sinais, +1.188 pips)
-- Gerado por scripts/import-elite-xlsx.mjs

insert into public.elite_monthly_reports (year, month_index, month_label, signals, pips, result_label, status_label, assets)
values (2021, 2, 'Março', 41, 1188, '+1.188 pips', 'Finalizado', array['XAU/USD', 'WTI', 'GBP/USD', 'USD/CAD', 'CHF/JPY', 'EUR/AUD', 'GBP/CAD', 'EUR/CAD']::text[])
on conflict (year, month_index) do update set signals = excluded.signals, pips = excluded.pips, result_label = excluded.result_label, status_label = excluded.status_label, assets = excluded.assets, updated_at = now();

delete from public.elite_operations where report_month = 'Março/2021';

insert into public.elite_operations (
  asset, direction, status, result_pips, result_label, report_month, traded_on, updated_label,
  sort_order, show_public, close_outcome, signal_tier, signal_number, entry_price, take_price, stop_price
)
values
  ('XAU/USD', 'Venda', 'closed', 164, '+164 pips', 'Março/2021', '2021-03-01', 'Finalizado', 1, true, 'take', 'elite', 1, 1737.55, 1721.13, 1745.7),
  ('WTI', 'Venda', 'closed', 50, '+50 pips', 'Março/2021', '2021-03-01', 'Finalizado', 2, true, 'take', 'elite', 2, 0.62079, 0.62726, 0.61424),
  ('GBP/USD', 'Venda', 'closed', 65, '+65 pips', 'Março/2021', '2021-03-01', 'Finalizado', 3, true, 'take', 'elite', 3, 1.39232, 1.38578, 1.39712),
  ('XAU/USD', 'Venda', 'closed', -39, '-39 pips', 'Março/2021', '2021-03-02', 'Finalizado', 4, true, 'stop', 'elite', 4, 1726.72, 1722.19, 1730.62),
  ('USD/CAD', 'Venda', 'closed', 30, '+30 pips', 'Março/2021', '2021-03-02', 'Finalizado', 5, true, 'take', 'elite', 5, 1.26498, 1.26124, 1.26762),
  ('CHF/JPY', 'Venda', 'closed', 13, '+13 pips', 'Março/2021', '2021-03-03', 'Finalizado', 6, true, 'take', 'elite', 6, 116.539, 116.29, 116.697),
  ('EUR/AUD', 'Compra', 'closed', -59, '-59 pips', 'Março/2021', '2021-03-04', 'Finalizado', 7, true, 'stop', 'elite', 7, 1.54894, 1.554, 1.543),
  ('EUR/AUD', 'Compra', 'closed', -20, '-20 pips', 'Março/2021', '2021-03-04', 'Finalizado', 8, true, 'stop', 'elite', 8, 1.545, 1.554, 1.543),
  ('XAU/USD', 'Compra', 'closed', -51, '-51 pips', 'Março/2021', '2021-03-05', 'Finalizado', 9, true, 'stop', 'elite', 9, 1699.03, 1704.28, 1693.93),
  ('GBP/CAD', 'Compra', 'closed', -24, '-24 pips', 'Março/2021', '2021-03-05', 'Finalizado', 10, true, 'stop', 'elite', 10, 1.75723, 1.75282, 1.75966),
  ('WTI', 'Venda', 'closed', 70, '+70 pips', 'Março/2021', '2021-03-08', 'Finalizado', 11, true, 'take', 'elite', 11, 0.66673, 0.6399, 0.66735),
  ('GBP/CAD', 'Compra', 'closed', 50, '+50 pips', 'Março/2021', '2021-03-08', 'Finalizado', 12, true, 'take', 'elite', 12, 1.751, 1.756, 1.74673),
  ('EUR/CAD', 'Compra', 'closed', 32, '+32 pips', 'Março/2021', '2021-03-09', 'Finalizado', 13, true, 'take', 'elite', 13, 1.50167, 1.50488, 1.49906),
  ('AUD/JPY', 'Compra', 'closed', 53, '+53 pips', 'Março/2021', '2021-03-10', 'Finalizado', 14, true, 'take', 'elite', 14, 83.844, 84.64, 83.058),
  ('WTI', 'Compra', 'closed', 50, '+50 pips', 'Março/2021', '2021-03-10', 'Finalizado', 15, true, 'take', 'elite', 15, 0.64596, 0.65345, 0.64),
  ('XAU/USD', 'Venda', 'closed', 70, '+70 pips', 'Março/2021', '2021-03-11', 'Finalizado', 16, true, 'take', 'elite', 16, 1732.38, 1725.43, 1739.35),
  ('USD/CAD', 'Venda', 'closed', 51, '+51 pips', 'Março/2021', '2021-03-12', 'Finalizado', 17, true, 'take', 'elite', 17, 1.25393, 1.24886, 1.25736),
  ('EUR/USD', 'Venda', 'closed', -24, '-24 pips', 'Março/2021', '2021-03-15', 'Finalizado', 18, true, 'stop', 'elite', 18, 1.19211, 1.18481, 1.19452),
  ('USD/CAD', 'Compra', 'closed', 21, '+21 pips', 'Março/2021', '2021-03-15', 'Finalizado', 19, true, 'take', 'elite', 19, 1.24706, 1.24914, 1.24569),
  ('WTI', 'Venda', 'closed', 47, '+47 pips', 'Março/2021', '2021-03-15', 'Finalizado', 20, true, 'take', 'elite', 20, 0.64017, 0.63545, 0.64753),
  ('CAD/JPY', 'Venda', 'closed', -43, '-43 pips', 'Março/2021', '2021-03-16', 'Finalizado', 21, true, 'stop', 'elite', 21, 87.266, 86.812, 87.699),
  ('WTI', 'Venda', 'closed', 46, '+46 pips', 'Março/2021', '2021-03-17', 'Finalizado', 22, true, 'take', 'elite', 22, 0.64277, 0.63813, 0.6476),
  ('GBP/CAD', 'Compra', 'closed', 30, '+30 pips', 'Março/2021', '2021-03-18', 'Finalizado', 23, true, 'take', 'elite', 23, 1.73337, 1.74, 1.7277),
  ('EUR/CAD', 'Compra', 'closed', 38, '+38 pips', 'Março/2021', '2021-03-19', 'Finalizado', 24, true, 'take', 'elite', 24, 1.48711, 1.49095, 1.48335),
  ('USD/JPY', 'Venda', 'closed', 30, '+30 pips', 'Março/2021', '2021-03-22', 'Finalizado', 25, true, 'take', 'elite', 25, 108.745, 108.39, 108.994),
  ('EUR/GBP', 'Compra', 'closed', -46, '-46 pips', 'Março/2021', '2021-03-23', 'Finalizado', 26, true, 'stop', 'elite', 26, 0.86234, 0.86804, 0.85777),
  ('USD/CAD', 'Compra', 'closed', 51, '+51 pips', 'Março/2021', '2021-03-23', 'Finalizado', 27, true, 'take', 'elite', 27, 1.25945, 1.26231, 1.25438),
  ('XAU/USD', 'Venda', 'closed', -50, '-50 pips', 'Março/2021', '2021-03-24', 'Finalizado', 28, true, 'stop', 'elite', 28, 1730.38, 1720.04, 1735.41),
  ('XAU/USD', 'Venda', 'closed', 50, '+50 pips', 'Março/2021', '2021-03-24', 'Finalizado', 29, true, 'take', 'elite', 29, null, null, null),
  ('XAU/USD', 'Compra', 'closed', 45, '+45 pips', 'Março/2021', '2021-03-25', 'Finalizado', 30, true, 'take', 'elite', 30, 1740.09, 1745.73, 1733.72),
  ('GBP/USD', 'Compra', 'closed', 31, '+31 pips', 'Março/2021', '2021-03-25', 'Finalizado', 31, true, 'take', 'elite', 31, 1.3745, 1.38249, 1.3692),
  ('AUD/CAD', 'Compra', 'closed', 16, '+16 pips', 'Março/2021', '2021-03-26', 'Finalizado', 32, true, 'take', 'elite', 32, 0.95808, 0.96139, 0.95485),
  ('XAU/USD', 'Venda', 'closed', 94, '+94 pips', 'Março/2021', '2021-03-29', 'Finalizado', 33, true, 'take', 'elite', 33, 1724.98, 1715.54, 1734.54),
  ('EUR/AUD', 'Compra', 'closed', -34, '-34 pips', 'Março/2021', '2021-03-29', 'Finalizado', 34, true, 'stop', 'elite', 34, 1.54184, 1.54905, 1.53842),
  ('EUR/AUD', 'Compra', 'closed', 71, '+71 pips', 'Março/2021', '2021-03-30', 'Finalizado', 35, true, 'take', 'elite', 35, 1.54133, 1.54905, 1.53842),
  ('EUR/GBP', 'Compra', 'closed', 22, '+22 pips', 'Março/2021', '2021-03-30', 'Finalizado', 36, true, 'take', 'elite', 36, 0.85502, 0.85717, 0.8516),
  ('WTI', 'Venda', 'closed', 72, '+72 pips', 'Março/2021', '2021-03-31', 'Finalizado', 37, true, 'take', 'elite', 37, 0.60254, 0.59539, 0.60904),
  ('WTI', 'Venda', 'closed', 50, '+50 pips', 'Março/2021', '2021-03-31', 'Finalizado', 38, true, 'take', 'elite', 38, 0.5941, 0.58393, 0.6023),
  ('XAU/USD', 'Venda', 'closed', 46, '+46 pips', 'Março/2021', '2021-03-31', 'Finalizado', 39, true, 'take', 'elite', 39, 1706.54, 1701.93, 1711.25),
  ('EUR/AUD', 'Compra', 'closed', 40, '+40 pips', 'Março/2021', '2021-03-31', 'Finalizado', 40, true, 'take', 'elite', 40, 1.54369, 1.556, 1.53928),
  ('EUR/NZD', 'Compra', 'closed', 80, '+80 pips', 'Março/2021', '2021-03-31', 'Finalizado', 41, true, 'take', 'elite', 41, 1.68376, 1.7227, 1.67223);
