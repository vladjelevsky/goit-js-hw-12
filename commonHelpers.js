import{a as d,S as w,i as p}from"./assets/vendor-c493984e.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))o(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(t){if(t.ep)return;t.ep=!0;const r=s(t);fetch(t.href,r)}})();function g({hits:e}){if(e.length===0){onSearchError();return}return e.map(({webformatURL:a,largeImageURL:s,tags:o,likes:t,views:r,comments:n,downloads:L})=>`
      <li class="gallery-item">
      <a class="gallery-link" href="${s}">
     <img
      class="gallery-image"
      src="${a}"
      alt="${o}"
    />
  </a>
  <ul class="galery-attribute-list">
    <li class="attribute-item">
          <p class="attribute">Likes</p>
          <p class="attribute-value">${t}</p>
        </li>
        <li class="attribute-item">
          <p class="attribute">Views</p>
          <p class="attribute-value">${r}</p>
        </li>
        <li class="attribute-item">
          <p class="attribute">Comments</p>
          <p class="attribute-value">${n}</p>
        </li>
        <li class="attribute-item">
          <p class="attribute">Downloads</p>
          <p class="attribute-value">${L}</p>
        </li>
        </ul>
</li>`).join("")}d.defaults.baseURL="https://pixabay.com/api/";const m=15;async function f(e,a){const s="45092252-8f5dca745258e9b30d446a442",o=new URLSearchParams({key:s,per_page:m,page:a,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true"});try{return(await d.get(`?${o}`)).data}catch{throw new Error("Failed to fetch images")}}const c=document.querySelector(".gallery"),S=document.querySelector(".js-search-form"),i=document.querySelector(".loader"),l=document.querySelector(".js-load-btn");let u=1,y="";l.style.display="none";i.style.display="none";S.addEventListener("submit",k);async function k(e){e.preventDefault();const a=e.currentTarget;if(y=a.elements.query.value.trim().toLowerCase(),y===""){c.innerHTML="",q("Please enter a search query.");return}i.style.display="block",c.innerHTML="",u=1;try{const s=await f(y,u),o=g(s);c.innerHTML=o,b.refresh(),s.totalHits>15?l.style.display="block":l.style.display="none"}catch{h()}finally{i.style.display="none",a.reset()}}l.addEventListener("click",async()=>{u+=1,i.style.display="block";try{const e=await f(y,u),a=g(e);c.insertAdjacentHTML("beforeend",a),b.refresh(),M();const s=Math.ceil(e.totalHits/m);u>=s&&(l.style.display="none",v("We're sorry, but you've reached the end of search results."))}catch{h()}finally{i.style.display="none"}});function h(e){P("Sorry, there are no images matching your search query. Please try again!"),c.innerHTML="",l.style.display="none",i.style.display="none"}function M(){const e=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}let b=new w(".gallery .gallery-link",{captionsData:"alt",captionDelay:250});function P(e){p.error({class:"izi-toast",message:e,position:"topRight",theme:"dark",backgroundColor:"rgba(239, 64, 64, 1)",progressBarColor:"rgba(181, 27, 27, 1)"})}function q(e){p.warning({class:"izi-toast",message:e,position:"topRight",theme:"dark",backgroundColor:"rgba(255, 160, 0, 1)",progressBarColor:"rgba(187, 123, 16, 1)"})}function v(e){p.info({class:"izi-toast",message:e,position:"bottomRight",theme:"dark",backgroundColor:"rgba(0, 153, 255, 1)",progressBarColor:"rgba(0, 113, 189, 1)"})}
//# sourceMappingURL=commonHelpers.js.map
