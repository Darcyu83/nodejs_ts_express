# Nodejs typescript express 프로젝트

##

## jest

npm i -D jest ts-jest @types/jest supertest

env 파일을 사용중이라면 jest —setupFiles dotenv/config를 꼭 넣어서 사용해야한다

EXPRESS 또는 비동기 NODE APP은 JEST 테스트 실행이 모두 완료되어도 비동기가 남아있는 경우 그대로 jest가 종료되지 않는데 detectOpenHandles 옵션은 열려있는 핸들을 모두 수집하고 forceExit 옵션은 테스트가 끝나면 강제 종료하라는 의미의 옵션

"scripts": {
"start": "nodemon src/app.ts",
"test": "jest --setupFiles dotenv/config --forceExit --detectOpenHandles"
},

afterAll(fn, timeout) : 모든 테스트가 끝나고 실행된다
afterEach(fn, timeout) : 하나의 테스트가 끝날 때마다 실행된다
beforeAll(fn, timeout): 모든 테스트가 시작하기 전에 한번 실행된다.
beforeEach(fn, timeout): 하나의 테스트가 시작하기 전에 매번 실행한다
