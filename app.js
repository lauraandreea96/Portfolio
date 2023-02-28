//move elements on mouse move
document.addEventListener("mousemove", (e)=>{
    let x = e.pageX;
    let y = e.pageY;
    if(window.pageYOffset <= window.innerHeight){
        document.querySelectorAll(".object").forEach((item)=>{
            let speed = item.getAttribute("data-speed");
            let positionX = (window.innerWidth - x * speed) / 100;
            let positionY = (window.innerHeight - y * speed) / 100;

            item.style.transform = `translateY(${positionY}px) translateX(${positionX}px)`;
        })

        document.querySelectorAll(".eye").forEach((item)=>{
            let speed = item.getAttribute("data-speed");
            let positionX = (window.innerWidth - x * speed) / 100;
            let positionY = (window.innerHeight - y * speed) / 100;
            
                item.style.transform = `translateY(${positionY - 7}px) translateX(${positionX - 24}px)`;
        })
    } 
})

//header moving on scroll
gsap.to(".leftImg", {
    scrollTrigger: {
        scrub: 1,
    },
    x: -1000,
    scale: 2

});

gsap.to(".rightImg", {
    scrollTrigger: {
        scrub: 1
    },
    x: 1000,
    scale: 2

});

gsap.to(".text", {
    scrollTrigger: {
        scrub: 1,
    },
    scale: 1.5

});


// falling petals


let endPath = document.querySelector("#path").getBoundingClientRect().bottom;
let fallEnd = document.querySelector(".fallEnd").getBoundingClientRect().top;
let petalaPosition = document.querySelector(".petala2").getBoundingClientRect().top;


//dissapear falling after finish the path
  window.addEventListener('scroll', function() {
    if(window.pageYOffset >= endPath -200 ){
        document.querySelector(".petala").style.display = "none";
        document.querySelector(".petala2").style.display = "none";
    }else{
        document.querySelector(".petala").style.display = "block";
        document.querySelector(".petala2").style.display = "block";
    }
  });
  

gsap.to(".petala", {
    motionPath:{
        path: endPath < fallEnd ? "#pathBig" : "#path",
        align: endPath < fallEnd ? "#pathBig" : "#path",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
      }, 
    scrollTrigger: {
        trigger: ".rightImg",
        start: "top top",
        end: endPath- 200,
        scrub: 1
    },
    ease: "none",
    scale: 2
});

gsap.to(".petala2", {
    motionPath:{
        path: endPath < fallEnd ? "#path2Big" : "#path2",
        align: endPath < fallEnd ? "#path2Big" : "#path2",
        autoRotate: true,
        alignOrigin: [0.5, 0.5]
      }, 
    scrollTrigger: {
        trigger: ".rightImg",
        start: "top top",
        end: endPath- 200,
        scrub: 1
    },
    ease: "none",
    scale: 2
});

//change text on header
const text = document.querySelector(".textChange");

const textLoad = () => {
    setTimeout(()=>{
        text.textContent = "graphic designer";
    }, 0);
    setTimeout(()=>{
        text.textContent = "frontend developer";
    }, 4000);
    setTimeout(textLoad, 8000);
}

textLoad();



//scroll home about items into view

const sliders = document.querySelectorAll(".slide-in");

const appearOptions = {
    threshold: 0,
    rootMargin: "0px 0px -250px 0px"
};

const appearOnScroll = new IntersectionObserver(function(
    entries,
    appearOnScroll
)  {
    entries.forEach(entry => {
        if(!entry.isIntersecting){
            return;
        } else {
            entry.target.classList.add("appear");
            appearOnScroll.unobserve(entry.target);
        }
    })
}, appearOptions);

sliders.forEach(slider => {
    appearOnScroll.observe(slider);
});



//scroll horizontal
var x = window.matchMedia("(min-width: 801px)")
function myFunction(x) {
    if (x.matches) { // If media query matches
        const bigcontainer = document.querySelector(".sticky-wrapper");
        const sections = gsap.utils.toArray(".sticky-wrapper .bigContainer");
        
        
        let scrollTrigger = gsap.to(sections, {
          xPercent: -100 * (sections.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: ".sticky-wrapper",
            pin: true,
            scrub: 1,
            end: "+=3000",
            // snap: 1 / (sections.length - 1),
            // markers: true,
          }
        });
        
        const bigcontainer2 = document.querySelector(".sticky-wrapper2");
        const sections2 = gsap.utils.toArray(".sticky-wrapper2 .bigContainer2");
        
        let scrollTrigger2 = gsap.to(sections2, {
          xPercent: -100 * (sections2.length - 1),
          ease: "none",
          scrollTrigger: {
            trigger: ".sticky-wrapper2",
            pin: true,
            scrub: 1,
            end: "+=3000",
            // snap: 1 / (sections2.length - 1),
            // markers: true,
          }
        }); 

        // whizz around the sections
        sections.forEach((section) => {
            // grab the scoped text
            let text = section.querySelectorAll(".anim");
            
            // bump out if there's no items to animate
            if(text.length === 0)  return 
            
            // do a little stagger
            gsap.from(text, {
            y: -130,
            opacity: 0,
            duration: 2,
            ease: "elastic",
            stagger: 0.1,
            scrollTrigger: {
                trigger: section,
                containerAnimation: scrollTrigger,
                start: "left center",
                // markers: true
            }
            });
        });

        sections2.forEach((section) => {
            // grab the scoped text
            let text = section.querySelectorAll(".anim");
            
            // bump out if there's no items to animate
            if(text.length === 0)  return 
            
            // do a little stagger
            gsap.from(text, {
            y: -130,
            opacity: 0,
            duration: 2,
            ease: "elastic",
            stagger: 0.1,
            scrollTrigger: {
                trigger: section,
                containerAnimation: scrollTrigger2,
                start: "left center",
                // markers: true
            }
            });
        });
    }
}

x.addEventListener('change', myFunction);
myFunction(x);


//projects detail modal

var modal = document.getElementById("myModal");

const modalContent = document.querySelector(".modal-content");

// Get the button that opens the modal
var btn = document.querySelector(".button");

// Get the <span> element that closes the modal
var span = document.querySelector(".close");

// When the user clicks the button, open the modal 
document.onclick = function(e) {
    if(e.target.classList.contains('button')){
        modal.style.display = "block";
        let data = designProjects.find(item => item.id == e.target.classList[1])
        let project = `
            <div class="container">
                <div class="flexContainer">
                    <p class="textItem">${data.desc}</p>
                    <img src="${data.photos[0]}" class="imgItem" alt="">
                </div>
                <div class="flexContainer">
                    <img src="${data.photos[1]}" class="imgItem" alt="">
                    <img src="${data.photos[2]}" class="imgItem" alt="">
                </div>
                <div class="fullImg">
                    <img src="${data.photos[3]}" alt="">
                </div>
            </div>
        `

        modalContent.insertAdjacentHTML("beforeend", project)
    }
}

//close modal
span.onclick = function() {
    modal.style.display = "none";
    modalContent.innerHTML = '';
  }






