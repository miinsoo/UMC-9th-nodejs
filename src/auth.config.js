import dotenv from "dotenv";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt'; 
import { prisma } from "./db.config.js"; 
import jwt from "jsonwebtoken"; 

dotenv.config();
const secret = process.env.JWT_SECRET; 

// ------------------------------------------------------------------
// 1. JWT 생성 함수
// ------------------------------------------------------------------

export const generateAccessToken = (user) => {
  return jwt.sign(
    { id: Number(user.id), email: user.email }, // user.id는 이미 Number로 변환되어 전달됨
    secret,                            
    { expiresIn: '1h' }                
  );
};

export const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: Number(user.id) },                   // user.id는 이미 Number로 변환되어 전달됨
    secret,
    { expiresIn: '14d' }               
  );
};

// ------------------------------------------------------------------
// 2. Google 인증 검증 함수 (Verification) - BigInt 변환 추가
// ------------------------------------------------------------------

const googleVerify = async (profile) => {
  const email = profile.emails?.[0]?.value;
  if (!email) {
    throw new Error(`profile.email was not found: ${profile}`);
  }

  // 1. 기존 사용자 조회
  const user = await prisma.user.findFirst({ where: { email } });
  if (user !== null) {
    // ✅ FIX: 조회된 user.id를 Number로 변환하여 반환
    return { id: Number(user.id), email: user.email, name: user.name }; 
  }

  // 2. 신규 사용자 생성 (필수 필드 포함)
  const created = await prisma.user.create({
    data: {
      email,
      name: profile.displayName,
      gender: "추후 수정",
      birthDate: new Date(1970, 0, 1), 
      highAddress: "추후 수정", 
      lowAddress: "추후 수정",  
      userPoint: 0, 
      isBusiness: false, 
      isActive: true, 
      // phoneNumber는 nullable이므로 생략 가능
    },
  });

  // ✅ FIX: 생성된 created.id를 Number로 변환하여 반환
  return { id: Number(created.id), email: created.email, name: created.name };
};

// ------------------------------------------------------------------
// 3. Google Strategy 설정
// ------------------------------------------------------------------

export const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.PASSPORT_GOOGLE_CLIENT_ID,
    clientSecret: process.env.PASSPORT_GOOGLE_CLIENT_SECRET,
    callbackURL: "/oauth2/callback/google", 
    scope: ["email", "profile"],
  },
  
  async (accessToken, refreshToken, profile, cb) => {
    try {
      const user = await googleVerify(profile);
      
      // user 객체에는 이미 Number 타입의 id가 담겨 있습니다.
      cb(null, { 
        accessToken: generateAccessToken(user),
        refreshToken: generateRefreshToken(user),
      });
    } catch (err) {
      cb(err, null);
    }
  }
);

// ------------------------------------------------------------------
// 4. JWT Strategy 설정 (인증된 사용자 요청 처리)
// ------------------------------------------------------------------

export const jwtStrategy = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: secret, 
  },
  async (jwt_payload, done) => {
    try {
      // JWT Payload의 id는 Number로 변환되어 저장되었으므로, DB 조회를 위해 BigInt로 다시 변환
      const userIdAsBigInt = BigInt(jwt_payload.id);
      
      const user = await prisma.user.findUnique({
        where: { id: userIdAsBigInt },
      });
      
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (error) {
      return done(error, false);
    }
  }
);