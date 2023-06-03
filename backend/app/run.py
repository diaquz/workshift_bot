from app.main import app
# from app.telegram.main import start

if __name__ == "__main__":
    
    # start()

    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080, log_level="debug")
