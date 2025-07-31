export default {
    async fetch(request, env) {
      // 0) 목적지·UTM 파라미터
      
      const dst = 'https://www.instagram.com/thenames_kr/';
      //const dst = 'https://jjhoil.com';
      const url = new URL(request.url);
  
      // 1) GA4 Measurement Protocol 이벤트 전송
      const body = JSON.stringify({
        client_id: crypto.randomUUID(),            // 익명 ID
        events: [{
          name: 'qr_scan',
          params: {
            source: url.searchParams.get('utm_source')   ?? 'leaflet',
            medium: url.searchParams.get('utm_medium')   ?? 'qr',
            campaign: url.searchParams.get('utm_campaign') ?? 'summer2025'
          }
        }]
      });
  
      fetch(`https://www.google-analytics.com/mp/collect?measurement_id=${env.GA_ID}&api_secret=${env.GA_SECRET}`,
        { method: 'POST', body, keepalive: true }).catch(() => {});
  
      // 2) 즉시 302 리다이렉트
      return Response.redirect(dst, 302);
    }
  }
  