import { formatDistanceToNow as formatDistanceToNowOrigin } from 'date-fns'
import { ja } from 'date-fns/locale'

/**
 * dateから現在時刻までのざっくりとした経過時間を取得
 * @param {Date} date
 * @returns string
 */
export const formatDistanceToNow = (date: Date) => {
  return formatDistanceToNowOrigin(date, { addSuffix: true, locale: ja })
}
