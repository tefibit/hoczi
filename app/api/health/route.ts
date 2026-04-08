import { getDataSource } from "@/lib/data-source";                                                                                                        
  import { NextResponse } from "next/server";       
                                                                                                                                                            
  export async function GET() {                                                                                                                          
    try {                                                                                                                                                   
      await getDataSource();                                                                                                                             
      return NextResponse.json({ status: "ok" });
    } catch (e: any) {                           
      return NextResponse.json({ status: "error", message: e.message }, { status: 500 });                                                                   
    }
  }             