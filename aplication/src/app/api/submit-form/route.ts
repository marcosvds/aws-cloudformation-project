'use server'
import { NextRequest, NextResponse } from "next/server";
import db from "../../../../db";
export async function POST(req: NextRequest) {
  let body = await req.json();
    const params = {
      TableName: 'PostsTable',
      Item: {
          'UserID': {S:body.UserID},
          'Title': {S:body.Title},
          'Text': {S:body.Text}
      }
    };
    
    return await (db.putItem(params).promise()).catch((err: any) => {
        return NextResponse.json(err);
    }).then((data:any) => {
        
      return NextResponse.json({message: "Post adicionado com sucesso!"});

    });
}

export async function GET() {
  const params = {
    TableName: 'PostsTable'
  };
  return await (db.scan(params).promise()).catch((err: any) => {
    console.error(err);
    return NextResponse.json([]);
  }).then((data:any) => {
    console.log(data.Items)
    return NextResponse.json(data.Items);
  });
}

export async function DELETE(req: NextRequest) {
  const body = await req.json();
  console.log(body.UserID)
  const params = {
    TableName: 'PostsTable',
    Key: {
      "UserID": {
        S:body.UserID
      },
      "Title":{
        S:body.Title
      }
    }
  };
  return await (db.deleteItem(params).promise()).catch((err: any) => {
    console.error(err);
    return NextResponse.json({ message: "Erro ao deletar o post." });
  }).then((data: any) => {
    return NextResponse.json({ message: "Post deletado com sucesso!" });
  });
}