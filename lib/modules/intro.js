
import prefix from '../prefix'
import translate from '../translate'

export default {
  deck: function (deck) {
    deck.intro = deck.queued(intro)

    function intro (next) {
      var cards = deck.cards

      cards.forEach(function (card, i) {
        card.setSide('front')
        card.intro(i, function (i) {
          setTimeout(function () {
            card.setSide('back')
          }, 500)
          if (i === cards.length - 1) {
            next()
          }
        })
      })
    }
  },
  card: function (card) {
    var transform = prefix('transform')
    var transition = prefix('transition')
    var transitionDelay = prefix('transition-delay')

    var $el = card.$el

    card.intro = function (i, cb) {
      var delay = i * 10 + 250
      var z = i / 4

      $el.style[transform] = translate(-z + 'px', '-250px')
      $el.style.opacity = 0
      $el.style.zIndex = i

      card.x = -z
      card.y = -250

      setTimeout(function () {
        $el.style[transition] = 'all 1s cubic-bezier(0.645, 0.045, 0.355, 1.000)'
        $el.style[transitionDelay] = delay / 1000 + 's'
        $el.style[transform] = translate(-z + 'px', -z + 'px')
        $el.style.opacity = 1

        card.x = -z
        card.y = -z

        setTimeout(function () {
          $el.style[transition] = ''

          cb && cb(i)
        }, 1250 + delay)
      }, 500)
    }
  }
}
