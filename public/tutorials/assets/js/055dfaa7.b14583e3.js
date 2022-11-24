"use strict";(self.webpackChunkdocs_website=self.webpackChunkdocs_website||[]).push([[609],{3905:(e,n,t)=>{t.d(n,{Zo:()=>u,kt:()=>d});var o=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function r(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function i(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?r(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):r(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function s(e,n){if(null==e)return{};var t,o,a=function(e,n){if(null==e)return{};var t,o,a={},r=Object.keys(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);for(o=0;o<r.length;o++)t=r[o],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var l=o.createContext({}),p=function(e){var n=o.useContext(l),t=n;return e&&(t="function"==typeof e?e(n):i(i({},n),e)),t},u=function(e){var n=p(e.components);return o.createElement(l.Provider,{value:n},e.children)},c={inlineCode:"code",wrapper:function(e){var n=e.children;return o.createElement(o.Fragment,{},n)}},m=o.forwardRef((function(e,n){var t=e.components,a=e.mdxType,r=e.originalType,l=e.parentName,u=s(e,["components","mdxType","originalType","parentName"]),m=p(t),d=a,h=m["".concat(l,".").concat(d)]||m[d]||c[d]||r;return t?o.createElement(h,i(i({ref:n},u),{},{components:t})):o.createElement(h,i({ref:n},u))}));function d(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var r=t.length,i=new Array(r);i[0]=m;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s.mdxType="string"==typeof e?e:a,i[1]=s;for(var p=2;p<r;p++)i[p]=t[p];return o.createElement.apply(null,i)}return o.createElement.apply(null,t)}m.displayName="MDXCreateElement"},6880:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>l,contentTitle:()=>i,default:()=>c,frontMatter:()=>r,metadata:()=>s,toc:()=>p});var o=t(7462),a=(t(7294),t(3905));const r={title:"Session 04 - Creating the Application Components",sidebar_position:1},i=void 0,s={unversionedId:"Authentication-App-With-NextJs-And-Microsoft-Graph/Creating-Application-Components",id:"Authentication-App-With-NextJs-And-Microsoft-Graph/Creating-Application-Components",title:"Session 04 - Creating the Application Components",description:"Now let's make some changes to our application. In this moment we are not going to use none UI framework. So, let's start creating some components.",source:"@site/docs/Authentication-App-With-NextJs-And-Microsoft-Graph/03-Creating-Application-Components.md",sourceDirName:"Authentication-App-With-NextJs-And-Microsoft-Graph",slug:"/Authentication-App-With-NextJs-And-Microsoft-Graph/Creating-Application-Components",permalink:"/MicrosoftCloud/tutorials/docs/Authentication-App-With-NextJs-And-Microsoft-Graph/Creating-Application-Components",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{title:"Session 04 - Creating the Application Components",sidebar_position:1},sidebar:"tutorialSidebar",previous:{title:"Session 03 - Structuring the Project",permalink:"/MicrosoftCloud/tutorials/docs/Authentication-App-With-NextJs-And-Microsoft-Graph/Structuring-Project"},next:{title:"Session 05 - Defining AAD Provider in Next.js",permalink:"/MicrosoftCloud/tutorials/docs/Authentication-App-With-NextJs-And-Microsoft-Graph/Defining-AAD-Provider-NextJs"}},l={},p=[],u={toc:p};function c(e){let{components:n,...t}=e;return(0,a.kt)("wrapper",(0,o.Z)({},u,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("p",null,"Now let's make some changes to our application. In this moment we are not going to use none UI framework. So, let's start creating some components. "),(0,a.kt)("p",null,"Every application needs a Layout. So, let's create a ",(0,a.kt)("inlineCode",{parentName:"p"},"Layout")," component. Create a folder called ",(0,a.kt)("inlineCode",{parentName:"p"},"components/Layout")," and inside it create the file:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Layout/layout.tsx"))),(0,a.kt)("details",null,(0,a.kt)("summary",null,(0,a.kt)("b",null,"components/Layout/layout.tsx")),(0,a.kt)("br",null),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"/**\n * file: components/Layout/layout.tsx\n * description: file responsible for the 'Layout' component\n * data: 10/26/2022\n * author: Glaucia Lemos <Twitter: @glaucia_lemos86>\n */\n\nimport Header from '../Header/header';\nimport Footer from '../Footer/footer';\nimport React, { ReactNode } from 'react';\n\ninterface LayoutProps {\n  children: ReactNode;\n}\n\nexport default function Layout({ children }: LayoutProps) {\n  return (\n    <>\n      <Header />\n      <main>{children}</main>\n      <Footer />\n    </>\n  );\n}\n"))),(0,a.kt)("br",null),(0,a.kt)("p",null,"Hold on! It's not over yet. We need to create the ",(0,a.kt)("inlineCode",{parentName:"p"},"Header")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"Footer")," components. So, let's create them."),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Header/header.module.css"))),(0,a.kt)("details",null,(0,a.kt)("summary",null,(0,a.kt)("b",null,"components/Header/header.module.css")),(0,a.kt)("br",null),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-css"},".signedInStatus {\n  display: block;\n  min-height: 4rem;\n  width: 100%;\n}\n\n.loading,\n.loaded {\n  position: relative;\n  top: 0;\n  opacity: 1;\n  overflow: hidden;\n  border-radius: 0 0 0.6rem 0.6rem;\n  padding: 0.6rem 1rem;\n  margin: 0;\n  background-color: rgba(0, 0, 0, 0.05);\n  transition: all 0.2s ease-in;\n}\n\n.loading {\n  top: -2rem;\n  opacity: 0;\n}\n\n.signedInText,\n.notSignedInText {\n  position: absolute;\n  padding-top: 0.8rem;\n  left: 1rem;\n  right: 6.5rem;\n  white-space: nowrap;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  display: inherit;\n  z-index: 1;\n  line-height: 1.3rem;\n}\n\n.signedInText {\n  padding-top: 0rem;\n  left: 4.6rem;\n}\n\n.avatar {\n  border-radius: 2rem;\n  float: left;\n  height: 2.8rem;\n  width: 2.8rem;\n  background-color: white;\n  background-size: cover;\n  background-repeat: no-repeat;\n}\n\n.button,\n.buttonPrimary {\n  float: right;\n  margin-right: -0.4rem;\n  font-weight: 500;\n  border-radius: 0.3rem;\n  cursor: pointer;\n  font-size: 1rem;\n  line-height: 1.4rem;\n  padding: 0.7rem 0.8rem;\n  position: relative;\n  z-index: 10;\n  background-color: transparent;\n  color: #555;\n}\n\n.buttonPrimary {\n  background-color: #346df1;\n  border-color: #346df1;\n  color: #fff;\n  text-decoration: none;\n  padding: 0.7rem 1.4rem;\n}\n\n.buttonPrimary:hover {\n  box-shadow: inset 0 0 5rem rgba(0, 0, 0, 0.2);\n}\n\n.navItems {\n  margin-bottom: 2rem;\n  padding: 0;\n  list-style: none;\n}\n\n.navItem {\n  display: inline-block;\n  margin-right: 1rem;\n}\n"))),(0,a.kt)("br",null),(0,a.kt)("p",null,"We won't go into details about the css. "),(0,a.kt)("p",null,"Now let's focus on the ",(0,a.kt)("inlineCode",{parentName:"p"},"header.tsx")," file. Open the ",(0,a.kt)("inlineCode",{parentName:"p"},"header.tsx")," file and add the following code:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Header/header.tsx"))),(0,a.kt)("details",null,(0,a.kt)("summary",null,(0,a.kt)("b",null,"components/Header/header.tsx")),(0,a.kt)("br",null),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"/**\n * file: components/Header/header.tsx\n * description: file responsible for the 'Header' component\n * data: 10/26/2022\n * author: Glaucia Lemos <Twitter: @glaucia_lemos86>\n */\n\nimport Link from 'next/link';\nimport { signIn, signOut, useSession } from 'next-auth/react';\nimport styles from './header.module.css';\n\nexport default function Header() {\n  const { data: session, status } = useSession();\n  const loading = status === 'loading';\n\n  return (\n    <header>\n      <noscript>\n        <style>{`.nojs-show { opacity: 1; top: 0; }`}</style>\n      </noscript>\n      <div className={styles.signedInStatus}>\n        <p\n          className={`nojs-show ${\n            !session && loading ? styles.loading : styles.loaded\n          }`}\n        >\n          {!session && (\n            <>\n              <span className={styles.notSignedInText}>\n                You are not signed in\n              </span>\n              <a\n                href={`/api/auth/signin`}\n                className={styles.buttonPrimary}\n                onClick={(e) => {\n                  e.preventDefault();\n                  signIn();\n                }}\n              >\n                Sign in\n              </a>\n            </>\n          )}\n          {session?.user && (\n            <>\n              {session.user.image && (\n                <span\n                  style={{ backgroundImage: `url('${session.user.image}')` }}\n                  className={styles.avatar}\n                ></span>\n              )}\n              <span className={styles.signedInText}>\n                <small>Signed in as</small>\n                <br />\n                <strong>{session.user.email ?? session.user.name}</strong>\n              </span>\n              <a\n                href={`/api/auth/signout`}\n                className={styles.button}\n                onClick={(e) => {\n                  e.preventDefault();\n                  signOut();\n                }}\n              >\n                {' '}\n                Sign Out\n              </a>\n            </>\n          )}\n        </p>\n      </div>\n      <nav>\n        <ul className={styles.navItems}>\n          <li className={styles.navItem}>\n            <Link href='/'>Home</Link>\n          </li>\n          <li className={styles.navItem}>\n            <Link href='/admin'>Admin</Link>\n          </li>\n          <li className={styles.navItem}>\n            <Link href='/reminder'>Reminder</Link>\n          </li>\n        </ul>\n      </nav>\n    </header>\n  );\n}\n"))),(0,a.kt)("br",null),(0,a.kt)("p",null,"If you look at the code above, you'll see that we're using the ",(0,a.kt)("inlineCode",{parentName:"p"},"useSession")," hook to get the session data. We're also using the ",(0,a.kt)("inlineCode",{parentName:"p"},"signIn")," and ",(0,a.kt)("inlineCode",{parentName:"p"},"signOut")," functions to sign in and out of the application. And also we are using the ",(0,a.kt)("inlineCode",{parentName:"p"},"status")," variable to check if the session is loading or not."),(0,a.kt)("p",null,"You will see we are using ",(0,a.kt)("inlineCode",{parentName:"p"},"session?.user")," to check if the user is signed in or not. If the user is signed in, we will show the user's name and email address. If the user is signed in we will show the ",(0,a.kt)("inlineCode",{parentName:"p"},"Sign Out")," button to log out of the application."),(0,a.kt)("p",null,"Inside in the ",(0,a.kt)("inlineCode",{parentName:"p"},"return")," block code we are using React. And also, we are using the ",(0,a.kt)("inlineCode",{parentName:"p"},"Link")," component from Next.js to navigate between pages."),(0,a.kt)("p",null,"And finally, let's create the Footer component. Open the ",(0,a.kt)("inlineCode",{parentName:"p"},"components")," folder and create a new folder called ",(0,a.kt)("inlineCode",{parentName:"p"},"Footer"),". Inside in the ",(0,a.kt)("inlineCode",{parentName:"p"},"Footer")," folder, create these files:"),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Footer/footer.module.css"))),(0,a.kt)("details",null,(0,a.kt)("summary",null,(0,a.kt)("b",null,"components/Footer/footer.module.css")),(0,a.kt)("br",null),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-css"},".footer {\n  margin-top: 2rem;\n}\n\n.navItems {\n  margin-bottom: 1rem;\n  padding: 0;\n  list-style: none;\n}\n\n.navItem {\n  display: inline-block;\n  margin-right: 1rem;\n}\n"))),(0,a.kt)("br",null),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"Footer/footer.tsx"))),(0,a.kt)("details",null,(0,a.kt)("summary",null,(0,a.kt)("b",null,"components/Footer/footer.tsx")),(0,a.kt)("br",null),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"import styles from '../Footer/footer.module.css';\n\nexport default function Footer() {\n  return (\n    <footer className={styles.footer}>\n      <hr />\n      <ul className={styles.navItems}>\n        <li className={styles.navItem}>\n          <a href='https://twitter.com/glaucia_lemos86'>Twitter</a>\n        </li>\n        <li className={styles.navItem}>\n          <a href='https://twitter.com/glaucia_lemos86'>Youtube</a>\n        </li>\n        <li className={styles.navItem}>\n          <a href='https://twitter.com/glaucia_lemos86'>Linkedin</a>\n        </li>\n      </ul>\n    </footer>\n  );\n}\n"))),(0,a.kt)("br",null),(0,a.kt)("p",null,"It's a simple footer component. But if you want to add more things to it, feel free to do it."),(0,a.kt)("p",null,"But what if the user is not logged in? So what happens?  We have to create a page that says the user does not have permission to access the page. Shall we create it? Let's do it!"),(0,a.kt)("p",null,"Inside the ",(0,a.kt)("inlineCode",{parentName:"p"},"components")," folder, create a new folder called ",(0,a.kt)("inlineCode",{parentName:"p"},"AccessDenied"),". Inside in this folder, create the file: "),(0,a.kt)("ul",null,(0,a.kt)("li",{parentName:"ul"},(0,a.kt)("inlineCode",{parentName:"li"},"AccessDenied/access-denied.tsx"))),(0,a.kt)("details",null,(0,a.kt)("summary",null,(0,a.kt)("b",null,"components/AccessDenied/access-denied.tsx")),(0,a.kt)("br",null),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-tsx"},"/**\n * file: components/AccessDenied/access-denied.tsx\n * description: file responsible for the 'AccessDenied' component.\n * data: 10/26/2022\n * author: Glaucia Lemos <Twitter: @glaucia_lemos86>\n */\n\nimport { signIn } from 'next-auth/react';\n\nexport default function AccessDenied() {\n  return (\n    <>\n      <h1>Access Denied</h1>\n      <p>\n        <a\n          href='/api/auth/signin'\n          onClick={(e) => {\n            e.preventDefault();\n            signIn();\n          }}\n        >\n          You must be signed in to view this page\n        </a>\n      </p>\n    </>\n  );\n}\n"))),(0,a.kt)("br",null),(0,a.kt)("p",null,"Again! It's a simple component. When we finish this whole tutorial, we can add some UI to it. But for now, let's keep it simple, using ",(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("a",{parentName:"strong",href:"https://mui.com/"},"Material UI")),"."),(0,a.kt)("p",null,"As we are using ",(0,a.kt)("strong",{parentName:"p"},(0,a.kt)("a",{parentName:"strong",href:"https://www.typescriptlang.org/"},"TypeScript"))," in this application, we need to transpile the code. So let's do it! Open the terminal and run the following command:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npm run build\n")),(0,a.kt)("p",null,"And then run the following command:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-bash"},"npm run dev\n")),(0,a.kt)("p",null,"You will see the screen it still the same. But why? Because we haven't created the pages yet. But let's make in the next section."))}c.isMDXComponent=!0}}]);