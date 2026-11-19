"use client";

import { FileData, StatusStep } from "@/types/workspace";
import { useEffect, useRef, useState } from "react";
import {
  SandpackProvider,
  SandpackLayout,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackFileExplorer,
  useSandpack,
} from "@codesandbox/sandpack-react";
import { dracula,atomDark} from "@codesandbox/sandpack-themes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { AlertTriangle, Bot, Code2, Eye } from "lucide-react";
import { RingLoader } from "react-spinners";
import { Button } from "./ui/button";

// _________________ Placeholder ___________________
const PLACEHOLDER_FILES = {
  "/App.js": {
    code: `export default function App() {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#0a0a0a",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontFamily: "system-ui, sans-serif",
    }}>
      <div style={{ textAlign: "center", color: "rgba(255,255,255,0.3)" }}>
        <div style={{ fontSize: 40, marginBottom: 16 }}>⚡</div>
        <p style={{ fontSize: 14 }}>Your app will appear here</p>
      </div>
    </div>
  );
}`,
  },
};

// ________________Base dependencies ______________

const BASE_DEPENDENCIES: Record<string, string> = {
  "react-is": "latest",
  "react-router-dom": "latest",
  "lucide-react": "latest",
  recharts: "latest",
  "date-fns": "latest",
  "framer-motion": "latest",
  "react-hook-form": "latest",
  "@hookform/resolvers": "latest",
  zod: "latest",
  "@radix-ui/react-dialog": "latest",
  "@radix-ui/react-dropdown-menu": "latest",
  "@radix-ui/react-tabs": "latest",
  "@radix-ui/react-tooltip": "latest",
  "@radix-ui/react-accordion": "latest",
  "@radix-ui/react-select": "latest",
  axios: "latest",
  clsx: "latest",
  "class-variance-authority": "latest",
  "tailwind-merge": "latest",
};

// _________________ Types _______________________

type ActiveTab = "preview"|"code"; 

interface CodePanelProps{
    fileData:FileData|null;
    isGenerating:boolean; 
    statusLog:StatusStep[];
    isImproving: boolean; 
    onFilePatch:(patches:FileData) =>void;
    onFixError:(error:string)=>Promise<void> ; 
 
}

function SandPackInner({
    fileData,
    isGenerating,
    activeTab,
    setActiveTab,
    isImproving,
    statusLog,
    onFixError,
}:{
    fileData:FileData|null; 
    isGenerating:boolean; 
    activeTab:ActiveTab; 
    setActiveTab:(t:ActiveTab) =>void; 
    isImproving:boolean,
    statusLog : StatusStep[]; 
    onFixError:(error:string)=>Promise<void> ; 

    //TODO : onImprove, onFixError ,  appTitle, isProUser
}){
    const {sandpack,listen} = useSandpack(); 
    const [previewError,setPreviewError] = useState<string | null>(null); 
    const unsubscribeRef = useRef<(()=>void)|null>(null)

    // Listen for Sandpack runtime errors
    useEffect(() => {
      unsubscribeRef.current = listen((msg) => {
        if (
          msg.type === "action" &&
          "action" in msg &&
          msg.action === "show-error"
        ) {
          const errMsg =
            "message" in msg && typeof msg.message === "string"
              ? msg.message
              : "An error occurred in the preview.";
          setPreviewError(errMsg);
          return;
        }
        if (msg.type === "compile") {
          const errMsg =
            "message" in msg && typeof msg.message === "string"
              ? msg.message
              : "Compile error in preview.";
          setPreviewError(errMsg);
          return;
        }
        if (msg.type === "success") {
          setPreviewError(null);
        }
      });
      return () => unsubscribeRef.current?.();
    }, [listen]);
    //Clear error when a new generation starts 
    useEffect(()=>{
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if(isGenerating) setPreviewError(null); 
    },[isGenerating])

    //TODO: listen - imported form useSandpack for error detection ; 

    //-Push file updates into sandpack with remounting 
    //we key sandpackprovider on the file PATH SET only . 
    //when file CONTENTS change (after generation), we push them via updateFile() ; 
    //so Sandpack stays mounted and the preview refreshes in place

    const prevFilesRef = useRef<Record<string,{code:string}>>({
        
    });

    useEffect(()=>{
        if(!fileData?.files) return; 
        const prev = prevFilesRef.current; 

        for(const [path,{code}] of Object.entries(fileData.files)){
          if(prev[path]?.code !== code){
            sandpack.updateFile(path,code); 
          }
        }
        prevFilesRef.current = fileData.files; 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[fileData?.files]);

    //TODO: useEffect listen() for sandpack preview errors 
    // msg.type === "action" && msg.action==="show-error"->setPreviewError
    // msg.type==="compile" &&"error" in msg-> setPreviewError
    // msg.type == "success" -> setPreview(null)

    //TODO: auto-switch to preview tab when fileDatat first arrives 
    //userEffect(()=>{if (fileData) setActiveTab("preview");},[fileData])

    useEffect(()=>{
      if(fileData) setActiveTab("preview")
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[fileData])


    return (
      <Tabs 
        value={activeTab}
        onValueChange={(v)=>setActiveTab(v as ActiveTab)}
        className="flex h-full flex-col gap-0"
      >
        <div className="flex items-center justify-between border-b border-white/6 px-2">
          <TabsList
            variant="line"
            className="h-auto gap-0 rounded-none bg-transparent p-0"
          >
            <TabsTrigger className="border-b-b2 pt-2" value="code">
              <Code2 className="h-3.5 w-3.5"/>
              Code
            </TabsTrigger>
            <TabsTrigger 
              className="border-b-2 pt-2"
              value="preview"
            >
              <Eye className="h-3.5 w-3.5"/>
              Preview
            </TabsTrigger>
          </TabsList>

          {/* TODO: Improve with AI button(Pro/Starter only, Pricing Modal for free) */}
          {/* TODO: Download ZIP button */}
        </div>


        {/* Content area */}
        <div className="flex-1 overflow-hidden">
          {/* TODO: loading overlay */}
          {(isGenerating || isImproving) && 
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 bg-[#0a0a0a]/85 backdrop-blur-sm">
            <RingLoader color="#60a5fa" size={64} speedMultiplier={0.8} />
            <div className="flex flex-col items-center gap-1.5">
              <p className="text-sm font-medium text-white/60">
                {isImproving ? "Improving with AI agent" 
                             :  (statusLog[statusLog.length-1]?.label ?? "Generating..")
                }
              </p>
              <p className="text-xs text-white/20">
                This usually takes 10–20 seconds
              </p>
            </div>
          </div>
          }
          <SandpackLayout
            style={{
              height:"100vh",
              border:"none",
              borderRadius:0,
              background: "transparent"
            }}
          >
            <TabsContent
              value="preview"
              className="mt-0 h-full w-full"

            >
              <SandpackPreview
                style={{height:"85.5%"}}
                showOpenInCodeSandbox={false}
              />
              
            </TabsContent>
            <TabsContent 
              value="code"
              className="mt-0 flex h-full w-full"
            >
              <SandpackFileExplorer
                style={{
                  height:"85.5%",
                  width:"180px",
                  borderRight:"0.5px solid rgba(255,255,255,0.08)"
                }}
              />
              <SandpackCodeEditor
                style={{height:"85.5%",flex:1}}
                showTabs
                showLineNumbers
                showInlineErrors
                closableTabs
                readOnly
              />
            </TabsContent>
          </SandpackLayout>
        </div>
      {/* Preview error banner — uses onFixError (Gemini), not onImprove (Cline) */}
      {previewError &&
        !isGenerating &&
        !isImproving &&
        activeTab === "preview" && (
          <div className="absolute inset-x-0 -bottom-3 z-20 border-t border-red-500/20 bg-red-950/99 p-4 pb-6">
            <div className="flex items-center gap-2.5">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-red-400/70" />
              <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-red-400/80">
                  Preview error
                </p>
                <p className="break-all text-[11px] text-red-300/50">
                  {previewError}
                </p>
              </div>
              <Button
                onClick={() => onFixError(previewError)}
                variant="destructive"
              >
                <Bot className="h-3 w-3" />
                Fix with AI
              </Button>
            </div>
          </div>
        )}

      </Tabs>
    )



}


export function CodePanel({
    fileData,
    isGenerating,
    statusLog,
    isImproving,
    onFilePatch: _onFilePatch,
    onFixError,
}:CodePanelProps){
    const [activeTab,setActiveTab] = useState<ActiveTab>("code");

    const files = fileData?.files ?? PLACEHOLDER_FILES;

    const dependencies = {
        ...BASE_DEPENDENCIES, 
        ...(fileData?.dependencies ?? {}),
    }

    const filePathKey = Object.keys(files).sort().join("|"); 

    return(
        <div className="flex flex-1 flex-col overflow-hidden">
            <SandpackProvider
              key={filePathKey}
              template="react"
              theme={atomDark}
              files={files}
              customSetup={{dependencies}}
              options={{
                //Tailwind v3 CDN injected into evry preview ifram 
                autorun: true,
                externalResources:["https://cdn.tailwindcss.com"],
                recompileMode:"delayed",
                recompileDelay:500,
              }}
            >
            <SandPackInner
              fileData = {fileData}
              statusLog = {statusLog}
              isImproving={isImproving}
              isGenerating= {isGenerating}
              activeTab ={activeTab}
              setActiveTab={setActiveTab}
              onFixError={onFixError}
            />
            </SandpackProvider>
        </div>
    )
}