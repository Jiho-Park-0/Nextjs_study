# Nextjs 스터디용 프로젝트

본 프로젝트는 카카오 테크 캠퍼스 3단계 진행중 활용한 Nextjs 스터디용 프로젝트입니다.

## 기술

- Next.js
- redux
- react-cookie

## 기능

- 회원가입 모달 및 기능 구현
  - email, name, password, districtId, 약관 동의를 받아 회원가입 진행
  - 모달은 parallel route와 interception route를 사용하여 해당 라우트에 렌더링을 인터셉트해서 모달을 띄움
- 로그인 모달 및 기능 구현
  - email, password로 로그인 진행, react-cookie를 사용해 쿠키에 저장
  - 받은 토큰을 기준으로 만료기간 설정
  - 만료기간 및 로그인 유무는 redux를 사용하여 저장
  - 전역정보를 유지하기 위해 redux-persist를 사용
  - 만료 후에는 새로운 토큰을 받은 뒤 새 토큰으로 설정
    </br>

### 추가사항

10월 4일 건강상의 이유로 더이상 프로젝트는 진행하지 않습니다. 그동안 같이 해준 팀원들에게 감사의 인사를 드립니다.
