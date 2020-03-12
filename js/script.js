const threshold = .1
const options = {
  root: null,
  rootMargin: '0px',
  threshold
}
var counterPie = document.querySelector("#animated_counter")
var counter = document.querySelector("#counter")
var counterValue = counter.textContent
// function offset(elt) {
//     var rect = elt.getBoundingClientRect(), bodyElt = document.body;
//     return {
//         top: rect.top + bodyElt .scrollTop,
//         left: rect.left + bodyElt .scrollLeft
//     }
// }

// window.addEventListener('scroll', function() {
//   const counterOffsetTop = offset(counter).top
//   if (counterOffsetTop < 0) {
//     counter.classList.remove('radial-chart__value')
//   } else if ( counterOffsetTop - window.innerHeight < 0){
//     counter.classList.add('radial-chart__value')
//   }  else if (counterOffsetTop - window.innerHeight > 0) {
//      counter.classList.remove('radial-chart__value')
//   }
// });

const increaseCounter = function (entries, observer) {
  entries.forEach(function (entry) {
    if (entry.intersectionRatio > threshold)  {
      counter.classList.remove("end");
      var i=0;
      var interval = parseInt(counter.dataset.interval)
      var speed = parseInt(counter.dataset.speed)
      var timer = setInterval(function(){
      i += interval
      if(i>counterValue){
        i = counterValue
        clearInterval(timer);
        counter.classList.add("end");
      }
      counterPie.style.strokeDashoffset =  550.292 - ( i / counterValue * 550.292 )
      counter.textContent = i;
    }, speed);
      //entry.target.classList.remove('reveal')
      //observer.unobserve(entry.target)
    }
  })
}
window.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver(increaseCounter, options)
  const targets = document.querySelectorAll('#counter')
  targets.forEach(function (target) {

    observer.observe(target)
  })
})
