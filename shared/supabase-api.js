// ==========================================
// ไฟล์กลางสำหรับการเชื่อมต่อฐานข้อมูล Supabase
// ใช้งานร่วมกันทั้งหน้าบทเรียนและหน้าเกมทุกด่าน
// ==========================================

const SUPABASE_URL = "https://dontfzkzlwnbfptpmayv.supabase.co/rest/v1/student_scores";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRvbnRmemt6bHduYmZwdHBtYXl2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3Mjc2OTAsImV4cCI6MjEwNTMwMzY5MH0.ql-NEY_X9m4r_bbO7BebYhTVW9RJJLBhSkOnYXOlIYc";
const supabaseHeaders = {
    "apikey": SUPABASE_KEY,
    "Authorization": "Bearer " + SUPABASE_KEY,
    "Content-Type": "application/json",
    "Prefer": "return=representation"
};

// ตรวจสอบการล็อกอินจากรหัสนักเรียนและห้องเรียน
async function apiLoginStudent(studentId, classRoom) {
    try {
        const response = await fetch(`${SUPABASE_URL}?student_id=eq.${studentId}&class_room=eq.${encodeURIComponent(classRoom)}&select=*`, {
            method: 'GET',
            headers: supabaseHeaders
        });
        if (!response.ok) throw new Error("Network error");
        const data = await response.json();
        return data.length > 0 ? data[0] : null;
    } catch (error) {
        console.error("Supabase Login Error:", error);
        throw error;
    }
}

// บันทึกคะแนนใหม่หากได้มากกว่าสถิติเดิม (รองรับชื่อคอลัมน์ของทุกกิจกรรม)
async function apiSaveScore(studentId, columnName, newScore) {
    try {
        const response = await fetch(`${SUPABASE_URL}?student_id=eq.${studentId}&select=${columnName}`, {
            method: 'GET',
            headers: supabaseHeaders
        });
        if (!response.ok) throw new Error("Failed to fetch previous score");
        const data = await response.json();

        if (data && data.length > 0) {
            const currentMax = data[0][columnName];
            // บันทึกทับเมื่อเป็น Null หรือคะแนนใหม่มากกว่าเดิม
            if (currentMax === null || newScore > currentMax) {
                const bodyData = {};
                bodyData[columnName] = newScore;
                
                await fetch(`${SUPABASE_URL}?student_id=eq.${studentId}`, {
                    method: 'PATCH',
                    headers: supabaseHeaders,
                    body: JSON.stringify(bodyData)
                });
                return true; // บันทึกสถิติใหม่สำเร็จ
            }
        }
        return false; // ไม่ได้อัปเดต (คะแนนเก่าน้อยกว่า)
    } catch(error) {
        console.error("Supabase Save Error:", error);
        throw error;
    }
}

// ดึงข้อมูล Leaderboard ตามห้องและชื่อคอลัมน์กิจกรรม
async function apiGetLeaderboard(classRoom, columnName, limit = 10) {
    try {
        const response = await fetch(`${SUPABASE_URL}?class_room=eq.${encodeURIComponent(classRoom)}&${columnName}=not.is.null&order=${columnName}.desc,updated_at.asc&limit=${limit}&select=name,${columnName}`, {
            method: 'GET',
            headers: supabaseHeaders
        });
        if (!response.ok) throw new Error("Failed to fetch leaderboard");
        return await response.json();
    } catch (error) {
        console.error("Supabase Leaderboard Error:", error);
        throw error;
    }
}
