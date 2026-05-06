# Vercel 배포 가이드 (GitHub 연동 자동 배포)

> 5분이면 끝납니다. 아래 순서대로 따라오세요.

## 1단계 — GitHub 저장소 만들기 (브라우저)

1. <https://github.com/new> 열기
2. Repository name: `nextjs-bootcamp` (자유롭게)
3. **Public** 또는 Private 둘 다 OK
4. ⚠️ "Initialize this repository with…" 옵션 **모두 체크 해제** (README, .gitignore, license 전부)
5. **Create repository** 클릭
6. 만들어진 페이지 상단의 HTTPS URL을 복사해 두세요. 예: `https://github.com/<your-id>/nextjs-bootcamp.git`

## 2단계 — 로컬 터미널에서 푸시

이 프로젝트 폴더에서 아래 5줄을 실행하세요.
**`<your-id>` 부분만 본인 GitHub 아이디로 교체하시면 됩니다.**

```bash
cd "C:\Users\Namgee\Documents\Claude\Projects\스터디"

git init -b main
git add -A
git commit -m "feat: Next.js 12주 부트캠프 사이트 초기 커밋"
git remote add origin https://github.com/<your-id>/nextjs-bootcamp.git
git push -u origin main
```

> Windows 터미널에서 한글 폴더 경로가 문제되면 PowerShell을 권장합니다. CMD에서는 따옴표 안 경로가 잘 풀립니다.

> Git 처음 쓰시면 첫 push에서 사용자명/PAT 입력 창이 뜹니다. 토큰은 <https://github.com/settings/tokens> 에서 `repo` 권한만 체크해서 발급하세요.

## 3단계 — Vercel에 Import (브라우저)

1. <https://vercel.com> 로그인 (GitHub 계정으로 OAuth)
2. 우상단 **Add New… → Project**
3. 방금 만든 `nextjs-bootcamp` 저장소를 찾아 **Import** 클릭
4. 설정 화면에서 **아무 것도 변경할 필요 없음** — Framework Preset이 자동으로 `Next.js`로 잡힙니다.
5. **Deploy** 클릭
6. 30~90초 후 빌드가 끝나면 `https://<프로젝트명>-<해시>.vercel.app` URL이 발급됩니다 🎉

## 4단계 — (선택) 도메인 연결

Vercel 프로젝트 → **Settings → Domains**

- 본인 도메인이 있다면: 도메인 입력 → DNS의 CNAME을 `cname.vercel-dns.com`으로 설정
- 무료 vercel.app 서브도메인을 더 예쁘게 바꾸려면: **Edit**으로 프로젝트명 변경 → 자동 갱신

## 5단계 — 이후 업데이트

코드 수정 → `git add -A && git commit -m "..." && git push`

푸시할 때마다 Vercel이 자동으로 새 버전을 배포합니다. PR을 열면 PR마다 별도 프리뷰 URL도 자동 생성됩니다.

---

## 🛠️ 메타데이터에서 도메인 갱신

배포 후 실제 도메인을 알게 되면 다음 두 곳의 URL을 갱신하면 OG 이미지/sitemap이 정확해집니다.

```ts
// app/layout.tsx
metadataBase: new URL("https://<your-real-domain>"),

// app/sitemap.ts
const BASE_URL = "https://<your-real-domain>";

// app/robots.ts
sitemap: "https://<your-real-domain>/sitemap.xml",
```

수정 후 다시 push 하면 끝.

---

## 🆘 문제 해결

- **빌드 실패: `Module not found`** → 의존성이 한쪽에만 있을 때. `package.json`에 누락이 없는지 확인.
- **이미지 안 뜸** → 외부 URL이라면 `next.config.mjs`의 `images.remotePatterns`에 호스트 추가.
- **OG 이미지 안 뜸** → `metadataBase`를 실제 도메인으로 갱신했는지 확인. (트위터/슬랙은 캐시가 길어서 카드 디버거 사용 권장: <https://cards-dev.twitter.com/validator>, <https://www.linkedin.com/post-inspector/>.)
- **타입 에러** → `npm run build` 로 로컬에서 먼저 검증.

---

## 📊 배포 후 모니터링 (Vercel 커넥터로 가능)

Cowork에 Vercel 커넥터가 연결돼 있으면, 배포 이후 다음 같은 질문이 가능합니다:

- "내 Vercel 프로젝트 목록 보여줘"
- "최근 배포 상태가 어떤지?"
- "마지막 배포의 빌드 로그 보여줘"

(주의: Vercel MCP는 read-only이므로 새 배포를 트리거하진 못합니다. 배포는 위 git push로만 자동화됩니다.)
