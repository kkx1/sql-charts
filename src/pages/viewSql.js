export default {
  sql:
  `SELECT
    city_name as "city_name__rotate_90",
    SUM(order_amt) as "order_amt__line__fmt_KMB",
    SUM(order_num) as "order_num__right__fmt_KMB"
  FROM st_app_platform_ka_ranking
  GROUP BY city_name`
}
