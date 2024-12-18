function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    
 
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    

}
locomotive()

function cursoreffect() {
    var page1Content = document.getElementById("page1-content")
    var cursor = document.getElementsByClassName("cursor")[0]
    

page1Content.addEventListener("mousemove",function(e){
    console.log(e);
    
    gsap.to(cursor,{
        x:e.x,
        y:e.y

    })
})

page1Content.addEventListener("mouseenter",function(){
    gsap.to(cursor,{
        scale:1
    })
})
page1Content.addEventListener("mouseleave",function(){
    gsap.to(cursor,{
        scale:0
    })
})


}

cursoreffect()




function pageAnimation(){
    gsap.from("#page2 .elem h1 " , {
        y:120,
        stagger: 0.2,
        duration: 1,
        scrollTrigger: {
            trigger: "#page2",
            scroller: "#main",
            start: "top 40%",
            end: "top 37%",
            // markers: true,
            scrub: 2
        }
    })

    gsap.from("#page4 .elem h1 ", {
        y: 120,
        stagger: 0.3,
        duration: 1,
        scrollTrigger: {
            trigger: "#page4",
            scroller: "#main",
            start: "top 40%",
            end: "top 37%",
            scrub: 2,
        },
      
    });

    gsap.from("#page6 .elem h1 ", {
        y: 120,
        stagger: 0.3,
        duration: 1,
        scrollTrigger: {
            trigger: "#page6",
            scroller: "#main",
            start: "top 40%",
            end: "top 37%",
            scrub: 2,
        },
      
    });

    gsap.from("#page8 h1 ", {
        y: 120,
        stagger: 0.3,
        duration: 1,
        scrollTrigger: {
            trigger: "#page8",
            scroller: "#main",
            start: "top 40%",
            end: "top 37%",
            scrub: 2,
        },
      
    });


}

pageAnimation()

function swiper() {
    var swiper = new Swiper(".mySwiper", {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        autoplay: {
            delay: 2000,
            disableOnInteraction: true,
          },
      });
    
}

swiper()

function loader() {
    var tl = gsap.timeline()

    tl.from("#loader h3",{
        x:40,
        opacity:0,
        duration:1,
        stagger:0.1
    })
    tl.to("#loader h3",{
        opacity:0,
        x:-20,
        duration:1,
        stagger:0.1
    })
    tl.to("#loader",{
        opacity:0
    })

    tl.to("#loader",{
        display:"none",
        onComplete: headingAnimation
    
    })
}

loader()

function headingAnimation() {
    gsap.from("#page1 h1 span", {
        duration: 1,
        opacity: 0,
        y: 70,
        stagger: 0.2, // Delay between each letter's animation
        ease: "power3.out" 
      });
}

function animateFooterLetters() {
    gsap.from("#footer-heading h1 span", {
      duration: 1,
      opacity: 0,
      y: 70, 
      stagger: 0.2, 
      ease: "power3.out" 
    });
  }


  const footerSection = document.querySelector("#footer");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateFooterLetters();
        observer.disconnect();
      }
    });
  }, { threshold: 0.5 }); 

 
  observer.observe(footerSection);