"use strict";(self.webpackChunkdocs_website=self.webpackChunkdocs_website||[]).push([[379],{3905:(e,t,a)=>{a.d(t,{Zo:()=>u,kt:()=>d});var n=a(7294);function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function o(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,n)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?o(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}function l(e,t){if(null==e)return{};var a,n,r=function(e,t){if(null==e)return{};var a,n,r={},o=Object.keys(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||(r[a]=e[a]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)a=o[n],t.indexOf(a)>=0||Object.prototype.propertyIsEnumerable.call(e,a)&&(r[a]=e[a])}return r}var p=n.createContext({}),s=function(e){var t=n.useContext(p),a=t;return e&&(a="function"==typeof e?e(t):i(i({},t),e)),a},u=function(e){var t=s(e.components);return n.createElement(p.Provider,{value:t},e.children)},m={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},c=n.forwardRef((function(e,t){var a=e.components,r=e.mdxType,o=e.originalType,p=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),c=s(a),d=r,N=c["".concat(p,".").concat(d)]||c[d]||m[d]||o;return a?n.createElement(N,i(i({ref:t},u),{},{components:a})):n.createElement(N,i({ref:t},u))}));function d(e,t){var a=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=a.length,i=new Array(o);i[0]=c;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:r,i[1]=l;for(var s=2;s<o;s++)i[s]=a[s];return n.createElement.apply(null,i)}return n.createElement.apply(null,a)}c.displayName="MDXCreateElement"},7702:(e,t,a)=>{a.r(t),a.d(t,{assets:()=>f,contentTitle:()=>A,default:()=>v,frontMatter:()=>g,metadata:()=>y,toc:()=>b});var n=a(7462),r=a(7294),o=a(3905),i=a(6010),l=a(2389),p=a(7392),s=a(7094),u=a(2466);const m="tabList__CuJ",c="tabItem_LNqP";function d(e){var t;const{lazy:a,block:o,defaultValue:l,values:d,groupId:N,className:k}=e,h=r.Children.map(e.children,(e=>{if((0,r.isValidElement)(e)&&"value"in e.props)return e;throw new Error(`Docusaurus error: Bad <Tabs> child <${"string"==typeof e.type?e.type:e.type.name}>: all children of the <Tabs> component should be <TabItem>, and every <TabItem> should have a unique "value" prop.`)})),g=d??h.map((e=>{let{props:{value:t,label:a,attributes:n}}=e;return{value:t,label:a,attributes:n}})),A=(0,p.l)(g,((e,t)=>e.value===t.value));if(A.length>0)throw new Error(`Docusaurus error: Duplicate values "${A.map((e=>e.value)).join(", ")}" found in <Tabs>. Every value needs to be unique.`);const y=null===l?l:l??(null==(t=h.find((e=>e.props.default)))?void 0:t.props.value)??h[0].props.value;if(null!==y&&!g.some((e=>e.value===y)))throw new Error(`Docusaurus error: The <Tabs> has a defaultValue "${y}" but none of its children has the corresponding value. Available values are: ${g.map((e=>e.value)).join(", ")}. If you intend to show no default tab, use defaultValue={null} instead.`);const{tabGroupChoices:f,setTabGroupChoices:b}=(0,s.U)(),[C,v]=(0,r.useState)(y),T=[],{blockElementScrollPositionUntilNextRender:E}=(0,u.o5)();if(null!=N){const e=f[N];null!=e&&e!==C&&g.some((t=>t.value===e))&&v(e)}const w=e=>{const t=e.currentTarget,a=T.indexOf(t),n=g[a].value;n!==C&&(E(t),v(n),null!=N&&b(N,String(n)))},O=e=>{var t;let a=null;switch(e.key){case"Enter":w(e);break;case"ArrowRight":{const t=T.indexOf(e.currentTarget)+1;a=T[t]??T[0];break}case"ArrowLeft":{const t=T.indexOf(e.currentTarget)-1;a=T[t]??T[T.length-1];break}}null==(t=a)||t.focus()};return r.createElement("div",{className:(0,i.Z)("tabs-container",m)},r.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:(0,i.Z)("tabs",{"tabs--block":o},k)},g.map((e=>{let{value:t,label:a,attributes:o}=e;return r.createElement("li",(0,n.Z)({role:"tab",tabIndex:C===t?0:-1,"aria-selected":C===t,key:t,ref:e=>T.push(e),onKeyDown:O,onClick:w},o,{className:(0,i.Z)("tabs__item",c,null==o?void 0:o.className,{"tabs__item--active":C===t})}),a??t)}))),a?(0,r.cloneElement)(h.filter((e=>e.props.value===C))[0],{className:"margin-top--md"}):r.createElement("div",{className:"margin-top--md"},h.map(((e,t)=>(0,r.cloneElement)(e,{key:t,hidden:e.props.value!==C})))))}function N(e){const t=(0,l.Z)();return r.createElement(d,(0,n.Z)({key:String(t)},e))}const k="tabItem_Ymn6";function h(e){let{children:t,hidden:a,className:n}=e;return r.createElement("div",{role:"tabpanel",className:(0,i.Z)(k,n),hidden:a},t)}const g={title:"6. Deploy the App to Azure Functions and Azure Container Apps",sidebar_position:6},A="Exercise 6",y={unversionedId:"ACS-to-Teams-Meeting/Deploy-to-Azure-Container-Apps",id:"ACS-to-Teams-Meeting/Deploy-to-Azure-Container-Apps",title:"6. Deploy the App to Azure Functions and Azure Container Apps",description:"Deploy the App to Azure Functions and Azure Container Apps",source:"@site/docs/ACS-to-Teams-Meeting/06-Deploy-to-Azure-Container-Apps.mdx",sourceDirName:"ACS-to-Teams-Meeting",slug:"/ACS-to-Teams-Meeting/Deploy-to-Azure-Container-Apps",permalink:"/MicrosoftCloud/tutorials/docs/ACS-to-Teams-Meeting/Deploy-to-Azure-Container-Apps",draft:!1,tags:[],version:"current",sidebarPosition:6,frontMatter:{title:"6. Deploy the App to Azure Functions and Azure Container Apps",sidebar_position:6},sidebar:"tutorialSidebar",previous:{title:"5. Deploy the App to Azure Static Web Apps",permalink:"/MicrosoftCloud/tutorials/docs/ACS-to-Teams-Meeting/Deploy-to-SWA"},next:{title:"Congratulations!",permalink:"/MicrosoftCloud/tutorials/docs/ACS-to-Teams-Meeting/Congratulations"}},f={},b=[{value:"Deploy the App to Azure Functions and Azure Container Apps",id:"deploy-the-app-to-azure-functions-and-azure-container-apps",level:2},{value:"Deploy to Azure Functions",id:"deploy-to-azure-functions",level:3},{value:"Deploy to Azure Container Apps",id:"deploy-to-azure-container-apps",level:3}],C={toc:b};function v(e){let{components:t,...r}=e;return(0,o.kt)("wrapper",(0,n.Z)({},C,r,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"exercise-6"},"Exercise 6"),(0,o.kt)("h2",{id:"deploy-the-app-to-azure-functions-and-azure-container-apps"},"Deploy the App to Azure Functions and Azure Container Apps"),(0,o.kt)("admonition",{type:"info"},(0,o.kt)("p",{parentName:"admonition"},"In addition to the ",(0,o.kt)("a",{parentName:"p",href:"/MicrosoftCloud/tutorials/docs/ACS-to-Teams-Meeting/"},"pre-requisites listed for this tutorial"),", you'll also need to install the Azure CLI on your machine to complete this exercise."),(0,o.kt)("ul",{parentName:"admonition"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("a",{parentName:"li",href:"https://learn.microsoft.com/cli/azure/install-azure-cli"},"Azure CLI")))),(0,o.kt)("p",null,"In this exercise you'll learn how to deploy the Microsoft Graph and ACS functions discussed in earlier exercises\nto Azure Functions. You'll also build a container image and deploy it to Azure Container Apps."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Azure Container Apps",src:a(170).Z,title:"Azure Container Apps",width:"1497",height:"700"})),(0,o.kt)("h3",{id:"deploy-to-azure-functions"},"Deploy to Azure Functions"),(0,o.kt)("p",null,"Let's get started by using VS Code to deploy the functions code to Azure Functions."),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Open the ",(0,o.kt)("inlineCode",{parentName:"p"},"samples/acs-video-to-teams-meeting/server/typescript")," project folder in Visual Studio Code.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"You should already have run ",(0,o.kt)("inlineCode",{parentName:"p"},"npm install")," and see a ",(0,o.kt)("inlineCode",{parentName:"p"},"node_modules")," folder in the project root. If not, open a command window and run ",(0,o.kt)("inlineCode",{parentName:"p"},"npm install")," to install the dependencies.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Open the VS Code command pallet (",(0,o.kt)("inlineCode",{parentName:"p"},"shift + cmd + p")," on Mac | ",(0,o.kt)("inlineCode",{parentName:"p"},"shift + ctrl + p")," on Windows), and select ",(0,o.kt)("strong",{parentName:"p"},"Azure Functions: Create Function App in Azure"),"."),(0,o.kt)("p",{parentName:"li"},(0,o.kt)("img",{alt:"Create Function App in Azure",src:a(2463).Z,title:"Create Function App in Azure",width:"848",height:"228"}))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"You'll be prompted to enter the following information:"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Your Azure subscription name."),(0,o.kt)("li",{parentName:"ul"},"The function name - enter ",(0,o.kt)("inlineCode",{parentName:"li"},"acsFunctions<YOUR_LAST_NAME>"),".")),(0,o.kt)("admonition",{parentName:"li",type:"note"},(0,o.kt)("p",{parentName:"admonition"},"A globally unique name is required. You can make the name more unique by adding a number or your last name to the end of the name.")),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"The runtime stack - Select the latest ",(0,o.kt)("inlineCode",{parentName:"li"},"Node.js LTS")," version."),(0,o.kt)("li",{parentName:"ul"},"The region (select any region you'd like)."))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Once the Azure Function App is created you'll see a message about viewing the details. ")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Go back to the command pallet in VS Code and select ",(0,o.kt)("strong",{parentName:"p"},"Azure Functions: Deploy to Function App"),". You'll be asked to select your subscription and the Function App name you created earlier.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Once the function is deployed to Azure, do the following:"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Select the Azure extension in VS Code (click the Azure icon in the sidebar)."),(0,o.kt)("li",{parentName:"ul"},"Expand your subscription."),(0,o.kt)("li",{parentName:"ul"},"Expand your Function App."),(0,o.kt)("li",{parentName:"ul"},"Right-click on the function and select ",(0,o.kt)("strong",{parentName:"li"},"Browse Website"),". Ensure the function app is working correctly before proceeding."))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Copy the Azure Function domain to a local file. You'll use the value later in this exercise."))),(0,o.kt)("h3",{id:"deploy-to-azure-container-apps"},"Deploy to Azure Container Apps"),(0,o.kt)("ol",null,(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"The first task you'll perform is to create a new ",(0,o.kt)("a",{parentName:"p",href:"https://learn.microsoft.com/azure/container-registry/container-registry-get-started-azure-cli"},"Azure Container Registry (ACR)")," resource. Once the registry is created, you'll build an image and push it to the registry.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Open a command window and run the following command to login to your Azure subscription:"),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"az login\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Add the following shell variables substituting your values for the placeholders. Add your ",(0,o.kt)("inlineCode",{parentName:"p"},"<GITHUB_USERNAME>")," as a lowercase value and subsitute your Azure Functions domain for the ",(0,o.kt)("inlineCode",{parentName:"p"},"<AZURE_FUNCTIONS_DOMAIN>")," value (include the ",(0,o.kt)("inlineCode",{parentName:"p"},"https://")," in the domain value)."),(0,o.kt)(N,{mdxType:"Tabs"},(0,o.kt)(h,{value:"bash",label:"Bash",mdxType:"TabItem"},(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'GITHUB_USERNAME="<YOUR_GITHUB_USERNAME>"\nRESOURCE_GROUP="<YOUR_RESOURCE_GROUP_NAME>"\nACR_NAME="aca"$GITHUB_USERNAME\nAZURE_FUNCTIONS_DOMAIN="<YOUR_AZURE_FUNCTIONS_URL>"\n'))),(0,o.kt)(h,{value:"powershell",label:"PowerShell",mdxType:"TabItem"},(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-powershell"},'$GITHUB_USERNAME="<YOUR_GITHUB_USERNAME>"\n$RESOURCE_GROUP="<YOUR_RESOURCE_GROUP_NAME>"\n$ACR_NAME="aca"+$GITHUB_USERNAME\n$AZURE_FUNCTIONS_DOMAIN="<YOUR_AZURE_FUNCTIONS_URL>"\n'))))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Create a new ACR resource by running the following command:"),(0,o.kt)(N,{mdxType:"Tabs"},(0,o.kt)(h,{value:"bash",label:"Bash",mdxType:"TabItem"},(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"az acr create \\\n    --resource-group $RESOURCE_GROUP \\\n    --name $ACR_NAME \\\n    --sku Basic \\\n    --admin-enabled true\n"))),(0,o.kt)(h,{value:"powershell",label:"PowerShell",mdxType:"TabItem"},(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-powershell"},"az acr create `\n    --resource-group $RESOURCE_GROUP `\n    --name $ACR_NAME `\n    --sku Basic `\n    --admin-enabled true\n"))))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Open the ",(0,o.kt)("inlineCode",{parentName:"p"},"samples/acs-video-to-teams-meeting/client/react/Dockerfile")," file in your editor and notice that the following tasks are performed:"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"The React application is built and assigned to the ",(0,o.kt)("inlineCode",{parentName:"li"},"build")," stage."),(0,o.kt)("li",{parentName:"ul"},"The nginx server is configured and the output of the ",(0,o.kt)("inlineCode",{parentName:"li"},"build")," stage is copied into the nginx server image."))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Build the container image in Azure by running the following command from the root of the ",(0,o.kt)("inlineCode",{parentName:"p"},"samples/acs-video-to-teams-meeting/client/react")," folder. Replace ",(0,o.kt)("inlineCode",{parentName:"p"},"<YOUR_FUNCTIONS_DOMAIN>")," with your Azure Functions domain that you copied to a local file earlier in this exercise."),(0,o.kt)(N,{mdxType:"Tabs"},(0,o.kt)(h,{value:"bash",label:"Bash",mdxType:"TabItem"},(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"az acr build --registry $ACR_NAME --image acs-to-teams-meeting \\\n  --build-arg REACT_APP_ACS_USER_FUNCTION=$AZURE_FUNCTIONS_DOMAIN/api/ACSTokenFunction \\\n  --build-arg REACT_APP_TEAMS_MEETING_FUNCTION=$AZURE_FUNCTIONS_DOMAIN/api/TeamsMeetingFunction .\n"))),(0,o.kt)(h,{value:"powershell",label:"PowerShell",mdxType:"TabItem"},(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-powershell"},"az acr build --registry $ACR_NAME --image acs-to-teams-meeting `\n  --build-arg REACT_APP_ACS_USER_FUNCTION=+$AZURE_FUNCTIONS_DOMAIN+/api/ACSTokenFunction `\n  --build-arg REACT_APP_TEAMS_MEETING_FUNCTION=+$AZURE_FUNCTIONS_DOMAIN+/api/TeamsMeetingFunction .\n"))))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Run the following command to list the images in your registry. You should see your new image listed."),(0,o.kt)("pre",{parentName:"li"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"az acr repository list --name $ACR_NAME --output table\n"))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Now that the image is deployed, you need to create an Azure Container App that can run the container.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Visit ",(0,o.kt)("a",{parentName:"p",href:"https://portal.azure.com"},"https://portal.azure.com")," in your browser and sign in.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Type ",(0,o.kt)("inlineCode",{parentName:"p"},"container apps")," in the top search bar and select ",(0,o.kt)("inlineCode",{parentName:"p"},"Container Apps")," from the options that appear.")),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Select ",(0,o.kt)("inlineCode",{parentName:"p"},"Create")," in the toolbar."),(0,o.kt)("admonition",{parentName:"li",type:"note"},(0,o.kt)("p",{parentName:"admonition"},"Although you're using the Azure Portal, a Container App can also be created by using the Azure CLI. For more information, see ",(0,o.kt)("a",{parentName:"p",href:"https://learn.microsoft.com/azure/container-apps/get-started"},"Quickstart: Deploy your first container app"),". You'll see an example of how the Azure CLI can be used at the end of this exercise as well."))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Perform the following tasks:"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Select your subscription."),(0,o.kt)("li",{parentName:"ul"},"Select the resource group to use (create a new one if needed). You can use the same resource group that you used for your ACS resource if you'd like. Copy your resource group name to the same local file where you stored your Azure Functions domain."),(0,o.kt)("li",{parentName:"ul"},"Enter a Container app name of ",(0,o.kt)("inlineCode",{parentName:"li"},"acs-to-teams-meeting"),"."),(0,o.kt)("li",{parentName:"ul"},"Select a region."),(0,o.kt)("li",{parentName:"ul"},"Select ",(0,o.kt)("strong",{parentName:"li"},"Create new")," in the ",(0,o.kt)("strong",{parentName:"li"},"Container Apps Environment")," section."),(0,o.kt)("li",{parentName:"ul"},"Enter an ",(0,o.kt)("strong",{parentName:"li"},"Environment name")," of ",(0,o.kt)("inlineCode",{parentName:"li"},"acs-to-teams-meeting-env"),"."),(0,o.kt)("li",{parentName:"ul"},"Select the ",(0,o.kt)("strong",{parentName:"li"},"Create")," button."),(0,o.kt)("li",{parentName:"ul"},"Select ",(0,o.kt)("strong",{parentName:"li"},"Next: App settings >"),"."))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Enter the following values in the ",(0,o.kt)("strong",{parentName:"p"},"Create Container App")," screen:"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Deselect the ",(0,o.kt)("strong",{parentName:"li"},"Use quickstart image")," checkbox."),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Name"),": ",(0,o.kt)("inlineCode",{parentName:"li"},"acs-to-teams-meeting")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Image source"),": ",(0,o.kt)("inlineCode",{parentName:"li"},"Azure Container Registry")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Registry"),": ",(0,o.kt)("inlineCode",{parentName:"li"},"<YOUR_ACR_REGISTRY_NAME>.azurecr.io")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Image"),": ",(0,o.kt)("inlineCode",{parentName:"li"},"acs-to-teams-meeting")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Image tag"),": ",(0,o.kt)("inlineCode",{parentName:"li"},"latest")),(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"CPU and Memory"),": ",(0,o.kt)("inlineCode",{parentName:"li"},"0.25 CPU cores, -.5 Gi memory")))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"In the ",(0,o.kt)("strong",{parentName:"p"},"Application ingress settings")," section, do the following:"),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},"Select the ",(0,o.kt)("strong",{parentName:"li"},"Enabled")," checkbox."),(0,o.kt)("li",{parentName:"ul"},"Select the ",(0,o.kt)("strong",{parentName:"li"},"Accepting traffic from anywhere")," radio button.")),(0,o.kt)("admonition",{parentName:"li",type:"note"},(0,o.kt)("p",{parentName:"admonition"},"This will create an entry point (ingress) for your React application and allow it to be called from anywhere. Azure Container Apps redirects all traffic to HTTPS.")),(0,o.kt)("ul",{parentName:"li"},(0,o.kt)("li",{parentName:"ul"},(0,o.kt)("strong",{parentName:"li"},"Target Port"),": ",(0,o.kt)("inlineCode",{parentName:"li"},"80")," ")),(0,o.kt)("admonition",{parentName:"li",type:"note"},(0,o.kt)("p",{parentName:"admonition"},"This is the default port for the nginx server."))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Select ",(0,o.kt)("strong",{parentName:"p"},"Review + create"),". Once validation passes, select the ",(0,o.kt)("strong",{parentName:"p"},"Create")," button."),(0,o.kt)("admonition",{parentName:"li",type:"info"},(0,o.kt)("p",{parentName:"admonition"},"If you get an error it may be due to your container apps environment being inactive for too long. The simplest solution will be to go through the process of creating the container app again. Alternatively, you can run the following command to create the container app using the Azure CLI:")," ",(0,o.kt)(N,{mdxType:"Tabs"},(0,o.kt)(h,{value:"bash",label:"Bash",mdxType:"TabItem"},(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"az containerapp create --name acs-to-teams-meeting --resource-group $RESOURCE_GROUP \\\n    --location westus --image acs-to-teams-meeting \\\n    --cpu 0.25 --memory 0.5 --environment-name acs-to-teams-meeting-env \\\n    --ingress-enabled true --ingress-target-port 80 --ingress-type External \\\n    --ingress-protocol Https --ingress-traffic Anywhere\n"))," "),(0,o.kt)(h,{value:"powershell",label:"PowerShell",mdxType:"TabItem"},(0,o.kt)("pre",{parentName:"admonition"},(0,o.kt)("code",{parentName:"pre",className:"language-powershell"},"az containerapp create --name acs-to-teams-meeting --resource-group $RESOURCE_GROUP `\n    --location westus --image acs-to-teams-meeting `\n    --cpu 0.25 --memory 0.5 --environment-name acs-to-teams-meeting-env `\n    --ingress-enabled true --ingress-target-port 80 --ingress-type External `\n    --ingress-protocol Https --ingress-traffic Anywhere\n"))," ")))),(0,o.kt)("li",{parentName:"ol"},(0,o.kt)("p",{parentName:"li"},"Once your container app deployment completes, navigate to it in the Azure Portal and select the ",(0,o.kt)("strong",{parentName:"p"},"Application Url")," on the ",(0,o.kt)("strong",{parentName:"p"},"Overview")," screen to view the application running in the nginx container!"))))}v.isMDXComponent=!0},170:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/6-deploy-container-apps-1567658a83a619c19d90643540676672.png"},2463:(e,t,a)=>{a.d(t,{Z:()=>n});const n=a.p+"assets/images/create-function-app-in-azure-4e952497f29bff9ea0de11309d88910f.png"}}]);