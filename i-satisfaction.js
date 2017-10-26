/* 
MIT License

Copyright (c) 2017 Cool Lab

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

class ISatisfaction extends HTMLElement {
  static get is() { return 'i-satisfaction' }

  constructor() {
    super();
    this.question = this.getAttribute('question') || 'Are you ready?'
  }

  connectedCallback() {
    console.log('cool-satisfaction connected')
    this.attachShadow({mode: 'open'});
    this.shadowRoot.innerHTML = `
      <style>
        :host([hidden]) { display: none !important; }
        :host {
          display: black;
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          align-items: center;
          justify-content: space-around;
          background-color: var(--cs-background-color, #d7d7d7);
          box-shadow: 0px 1px 14px rgba(0, 0, 0, 0.8);
          padding: 2em;
          transition: all .3s ease;
          transform: translateY(105%);
        }

        :host([visible]) {
          transform: translateY(0);
        }
        .wrapper {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .question {
          font-size: 1.5em;
          font-weight: 700;
        }

        [dismiss-btn] {
          position: absolute;
          top: 8px;
          right: 8px;
          width: 24px;
          height: 24px;
          cursor: pointer;
        }
        .answer {
          text-align: center;
        }

        .star {
          fill: var(--cs-icon-fill-color, #000);
          cursor: pointer;
        }

        .star:hover {
          fill: var(--cs-icon-hover-color, gold);
        }

        .star > * { pointer-events: none; }
        .thx { font-size: 20px;}


        @media screen and (max-width: 720px) {
          .wrapper {
            flex-direction: column;
          }
          .question {
            font-size: 2.5em;
            text-align: center;
            margin-top: 0.5em;
          }
          .answer {
            margin-top: 1.5em;
          }
        }
      </style>
      <span dismiss-btn>x</span>
      <div class="wrapper">
        <div class="question">
          <span>${this.question}</span>
        </div>

        <!-- Amswer it -->
        <div class="answer">
          <span>
            <svg id="1" class="star" xmlns="http://www.w3.org/2000/svg" fill="gold" height="48" viewBox="0 0 24 24" width="48">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </span>

          <span>
            <svg id="2" class="star" xmlns="http://www.w3.org/2000/svg" fill="#000" height="48" viewBox="0 0 24 24" width="48">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </span>

          <span>
            <svg id="3" class="star" xmlns="http://www.w3.org/2000/svg" fill="#000" height="48" viewBox="0 0 24 24" width="48">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </span>

          <span>
            <svg id="4" class="star" xmlns="http://www.w3.org/2000/svg" fill="#000" height="48" viewBox="0 0 24 24" width="48">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </span>

          <span>
            <svg id="5" class="star" xmlns="http://www.w3.org/2000/svg" fill="#000" height="48" viewBox="0 0 24 24" width="48">
              <path d="M0 0h24v24H0z" fill="none"/>
              <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
              <path d="M0 0h24v24H0z" fill="none"/>
            </svg>
          </span>
        </div>
      </div>
    `
    // this.answersRef = firebase.database().ref('answers');
    // console.log(this.answersRef)
    this.wrapper = this.shadowRoot.querySelector('.wrapper');
    this.dismissBtn = this.shadowRoot.querySelector('[dismiss-btn]');
    this.starBtns = this.shadowRoot.querySelectorAll('.star');
    this.starBtns.forEach(starBtn => {
      starBtn.addEventListener('click', this._handleAnswer.bind(this))
    }) 
    // console.log(this.starBtns)
    this.dismissBtn.addEventListener('click', this._dismissHandler.bind(this))
  }

  attributeChangedCallback(attributeName, oldValue, newValue, namespace) {}

  show() { this.setAttribute('visible', '') }
  hidde() { this.removeAttribute('visible')}

  _handleAnswer() {
    let starId = event.path[0]
    //SEND THE USER RESPONSE TO THE SERVER
    fetch('https://us-central1-auctions-rbac.cloudfunctions.net/api/answers', {
      method: 'post',
      // mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"q": this.question, "a": starId.id})
    })
    .then(response => { return response.json() })
    .then(jsonResponse => {
      this.wrapper.innerHTML = `
        <span class="thx">Ευχαριστούμε</span>
      `
      let x = setTimeout(() => {
        this.removeAttribute('visible')
        clearTimeout(x)
      }, 2000);
    })
    .catch(error => {
      console.log(error)
      this.wrapper.innerHTML = `
        <span class="thx">Oups we had an error</span>
      `
      let x = setTimeout(() => {
        this.removeAttribute('visible')
        clearTimeout(x)
      }, 2000);
    })
  }
  _dismissHandler() { this.hidde(); }
}

window.customElements.define(ISatisfaction.is, ISatisfaction)