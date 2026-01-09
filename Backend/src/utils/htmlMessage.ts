/* eslint-disable prettier/prettier */
export const htmlMessage = (code:string) => {
  const html = `
        <div style="
        max-width:600px;
        margin:0 auto;
        background:#ffffff;
        border-radius:12px;
        box-shadow:0 8px 24px rgba(0,0,0,0.08);
        overflow:hidden;
        font-family:Arial, Helvetica, sans-serif;
      ">

        <!-- Header -->
        <div style="
          background:#CC3333;
          padding:24px;
          text-align:center;
        ">
          <h1 style="
            color:#ffffff;
            font-size:22px;
            margin:0;
            font-weight:bold;
          ">
            Password Reset
          </h1>
        </div>

        <!-- Body -->
        <div style="padding:32px 24px; text-align:center;">
          <h2 style="
            color:#333;
            font-size:20px;
            margin-bottom:12px;
          ">
            Forgot your password?
          </h2>

          <p style="
            color:#555;
            font-size:15px;
            line-height:1.6;
            margin-bottom:24px;
          ">
            If you didn’t request a password reset, you can safely ignore this email.
            <br />
            Use the code below to verify your account.
          </p>

          <!-- Code Box -->
          <div style="
            background:#f4f6f8;
            border-radius:10px;
            padding:16px;
            margin:0 auto 24px;
            width:fit-content;
          ">
            <span style="
              color:#2A435D;
              font-size:32px;
              font-weight:bold;
              letter-spacing:6px;
            ">
              ${code}
            </span>
          </div>

          <p style="
            color:#888;
            font-size:14px;
          ">
            This code will expire in a few minutes.
          </p>
        </div>

        <!-- Footer -->
        <div style="
          background:#fafafa;
          padding:16px;
          text-align:center;
          border-top:1px solid #eee;
        ">
          <span style="
            color:#CC3333;
            font-size:14px;
            font-weight:bold;
          ">
            Restaurant NestJS & Next.js
          </span>
        </div>

  </div>
    `;
    return html;
};
