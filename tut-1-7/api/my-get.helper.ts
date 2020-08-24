import { NextPageContext } from "next";
import Router from 'next/router';

export async function myGet(url: string, ctx: NextPageContext) {
  const cookie = ctx.req?.headers.cookie;

  const resp = await fetch(url, {
    headers:
    {
      cookie: cookie!,
    }
  });

  if (resp.status === 401) {
    if (!ctx.req) {
      Router.replace('/login');
      return {};
    } else {
      ctx.res?.writeHead(302, {
        location: 'http://localhost:3000/login',
      });
      ctx.res?.end();
    }
  }

  const json = await resp.json();
  return json;

}